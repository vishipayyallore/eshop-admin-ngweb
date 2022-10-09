import { HttpClient } from '@angular/common/http'
import { APP_INITIALIZER, Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'

import config from '~config'
import { Endpoints } from '~config/environments/endpoints'
import { factoryEndpoint } from '~common/services/endpoint/factory-endpoint'
import { After } from '~common/utilities/after.decorator'
import { Dummyable } from '~common/utilities/dummyable.decorator'
import { 
  emitPropertyChange, Stateful 
} from '~common/utilities/stateful.decorator'
import { developmentAppInitialize } from './helpers'
import { LogMethods } from '../../utilities/log-methods.decorator'
import { Environments } from '~/config/environments.enum'


export interface AppConfigurationService 
  extends Stateful<Partial<AppConfigurationService>> {}

@Injectable({
  providedIn: 'root'
})
@Stateful<Partial<AppConfigurationService>>()
@LogMethods({when: config.env === Environments.Development})
export class AppConfigurationService {
  endpoints = Object.fromEntries(config.endpoints.map(factoryEndpoint))
  configuration: any

  constructor(private httpClient: HttpClient) { }

  static forRoot(){
    return { 
      provide: APP_INITIALIZER,
      deps: [AppConfigurationService],
      useFactory: AppConfigurationService.useFactory,
      multi: true
    }
  }

  static useFactory(configurationService: AppConfigurationService) {
    return () => configurationService.initialize()
  }

  @Dummyable(developmentAppInitialize)
  async initialize() {
    const url = this.endpoints[Endpoints.Configuration].url
    this.configuration = await firstValueFrom(this.httpClient.get(url))
    console.log('[AppConfigurationService] configuration', this.configuration)
  }

  async getConfiguration(service: Endpoints) {
    if(!(service in this.endpoints)) return

    const url = this.endpoints[service].url
    const params = this.endpoints[service].factoryQueryParams()
    const configuration = await firstValueFrom(
      this.httpClient.get(url, {params}))

    const serviceName = this.endpoints[service].meta?.configuration?.serviceName
    if(!serviceName) {
      console.warn('[AppConfigurationService]'
        +' no serviceName in Endpoint meta (metadata) for', service)
      return
    }

    this.setConfiguration(
      Object.assign(this.configuration ?? {}, {[serviceName]: configuration}))
  }

  @After(emitPropertyChange('configuration'))
  private setConfiguration(configuration: any) {
    this.configuration = configuration
  }
}


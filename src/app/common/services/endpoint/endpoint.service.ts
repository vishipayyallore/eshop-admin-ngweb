import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';

import config from '~config'
import { factoryEndpoint } from './factory-endpoint'
import { EndpointHTTPArguments } from './endpoint-http-arguments.interface';
import { AppConfigurationService } from '../configuration/app-configuration.service';
//import { LogMethods } from '~common/utilities/log-methods.decorator';


@Injectable({
  providedIn: 'root'
})
//@LogMethods()
export class EndpointService {
  headers = {}
  endpoints = Object.fromEntries(config.endpoints.map(factoryEndpoint))

  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfigurationService
  ) { }

  clearEndpointValue(endpoint: string) {
    console.warn(`[EndpointService] clearing endpoint value for endpoint "${
      endpoint}"`)
    if(!this.endpoints[endpoint]) {
      throw new Error(`[EndpointService] Endpoint "${endpoint}" not found`)
    }
    this.endpoints[endpoint].value = undefined
  }

  getEndpoint<T>(config:EndpointHTTPArguments = <EndpointHTTPArguments>{}) {
    const {
      endpoint, 
      additionalHeaders, 
      additionalQueryParams
    } = this.getEndpointArguments(config)

    if(!this.endpoints[endpoint]) {
      throw new Error(`[EndpointService] Endpoint "${endpoint}" not found`)
    }
    if(!this.endpoints[endpoint].value) {
      const url = this.factoryUrl(this.endpoints[endpoint].url)
      const headers = this.endpoints[endpoint].factoryHeaders(additionalHeaders)
      const queryParams = this.endpoints[endpoint]
        .factoryQueryParams(additionalQueryParams)
        this.endpoints[endpoint].value = this.httpClient
        .get<T>(url, this.factoryOptions({headers, queryParams}))
        .pipe(shareReplay(1))

    }
    return this.endpoints[endpoint].value
  }

  postEndpoint<T>(config:EndpointHTTPArguments = <EndpointHTTPArguments>{}) {
    const {
      endpoint, 
      additionalHeaders, 
      additionalQueryParams,
      additionalBody
    } = this.getEndpointArguments(config)

    if(!this.endpoints[endpoint]) {
      throw new Error(`[EndpointService] Endpoint "${endpoint}" not found`)
    }
    if(!this.endpoints[endpoint].value) {
      const url = this.factoryUrl(this.endpoints[endpoint].url)
      const headers = this.endpoints[endpoint].factoryHeaders(additionalHeaders)
      const queryParams = this.endpoints[endpoint]
        .factoryQueryParams(additionalQueryParams)
      const body = this.endpoints[endpoint].factoryBody(additionalBody)
      this.endpoints[endpoint].value = this.httpClient
        .post<T>(url, body, this.factoryOptions({headers, queryParams}))
        .pipe(shareReplay(1))
    }
    return this.endpoints[endpoint].value
  }

  putEndpoint<T>(config:EndpointHTTPArguments = <EndpointHTTPArguments>{}) {
    const {
      endpoint, 
      additionalHeaders, 
      additionalQueryParams,
      additionalBody
    } = this.getEndpointArguments(config)

    if(!this.endpoints[endpoint]) {
      throw new Error(`[EndpointService] Endpoint "${endpoint}" not found`)
    }
    if(!this.endpoints[endpoint].value) {
      const url = this.factoryUrl(this.endpoints[endpoint].url)
      const headers = this.endpoints[endpoint].factoryHeaders(additionalHeaders)
      const queryParams = this.endpoints[endpoint]
        .factoryQueryParams(additionalQueryParams)
      const body = this.endpoints[endpoint].factoryBody(additionalBody)
      this.endpoints[endpoint].value = this.httpClient
        .put<T>(
          url, 
          body, 
          this.factoryOptions({headers, queryParams, observe: 'response'})
      )
        .pipe(shareReplay(1))
    }
    return this.endpoints[endpoint].value
  }

  deleteEndpoint<T>(config:EndpointHTTPArguments = <EndpointHTTPArguments>{}) {
    const {
      endpoint, 
      additionalHeaders, 
      additionalQueryParams,
    } = this.getEndpointArguments(config)

    if(!this.endpoints[endpoint]) {
      throw new Error(`[EndpointService] Endpoint "${endpoint}" not found`)
    }
    if(!this.endpoints[endpoint].value) {
      const url = this.factoryUrl(this.endpoints[endpoint].url)
      const headers = this.endpoints[endpoint].factoryHeaders(additionalHeaders)
      const queryParams = this.endpoints[endpoint]
        .factoryQueryParams(additionalQueryParams)
      this.endpoints[endpoint].value = this.httpClient
        .delete<T>(
          url, 
          this.factoryOptions({headers, queryParams, observe: 'response'})
        )
        .pipe(shareReplay(1))
    }
    return this.endpoints[endpoint].value
  }

  private getEndpointArguments(
    { 
      endpoint, 
      headers, 
      queryParams, 
      body 
    }: EndpointHTTPArguments
  ) {
    return {
      endpoint,
      additionalHeaders: headers,
      additionalQueryParams: queryParams,
      additionalBody: body
    }
  }

  private factoryUrl(url: string) {
    const rootUrl = config.apiHost 
      ?? this.appConfig.configuration?.apiHost
  console.log(this.appConfig)
    return rootUrl + url
  }

  private factoryOptions(
    { 
      headers, queryParams, observe 
    }: 
    { 
      headers: { [key: string]: string }, 
      queryParams: { [key: string]: string }, 
      observe?: any
    }
  ) {
    return {
      headers: {...this.headers, ...headers},
      params: queryParams,
      observe
    }
  }
}

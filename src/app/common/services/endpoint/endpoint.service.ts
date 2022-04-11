import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, shareReplay, tap } from 'rxjs';

import config from '~config'
import { factoryEndpoint } from './factory-endpoint'
import { EndpointHTTPArguments } from './endpoint-http-arguments.interface';
//import { LogMethods } from '~common/utilities/log-methods.decorator';


@Injectable({
  providedIn: 'root'
})
//@LogMethods()
export class EndpointService {
  headers = {}
  endpoints = Object.fromEntries(config.endpoints.map(factoryEndpoint))

  constructor(private httpClient: HttpClient) { }

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
      return this.httpClient
        .get<T>(url, this.factoryOptions({headers, queryParams}))
        .pipe(tap(response => this.endpoints[endpoint].value = response), shareReplay(1));

    }
    return of(this.endpoints[endpoint].value as T)
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
      const url = this.endpoints[endpoint].url
      const headers = this.endpoints[endpoint].factoryHeaders(additionalHeaders)
      const queryParams = this.endpoints[endpoint]
        .factoryQueryParams(additionalQueryParams)
      const body = this.endpoints[endpoint].factoryBody(additionalBody)
      return this.httpClient
        .post<T>(url, body, this.factoryOptions({headers, queryParams}))
        .pipe(tap(response => this.endpoints[endpoint].value = response), shareReplay(1));
    }
    return of(this.endpoints[endpoint].value as T)
  }

  private getEndpointArguments({ endpoint, headers, queryParams, body }: EndpointHTTPArguments) {
    return {
      endpoint,
      additionalHeaders: headers,
      additionalQueryParams: queryParams,
      additionalBody: body
    }
  }

  private factoryUrl(url: string) {
      return config.apiHost + url
  }

  private factoryOptions({ 
    headers, 
    queryParams 
  }: { 
    headers: { [key: string]: string }, 
    queryParams: { [key: string]: string } 
  }) {
    return {
      headers: {...this.headers, ...headers},
      params: queryParams
    }
  }
}

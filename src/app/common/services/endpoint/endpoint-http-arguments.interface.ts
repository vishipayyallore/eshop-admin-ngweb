import { JSONValue } from "~common/json"


export interface EndpointHTTPArguments {
  endpoint: string
  headers?: { [key: string]: string }
  queryParams?: { [key: string]: string }
  body?: JSONValue
}

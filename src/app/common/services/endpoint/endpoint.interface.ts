import type { JSONObject, JSONValue } from "~common/json"
import { HTTPRequestType } from "./http-request-type"


export interface Endpoint {
  name: string
  type: HTTPRequestType
  url: string | ((...args:any[]) => string)
  factoryHeaders?: ((partial:{ [key: string]: string }) => { [key: string]: string })
  factroyQueryParams?: ((partial:{ [key: string]: string }) => { [key: string]: string })
  factoryBody?: ((partial:JSONValue) => JSONValue)
  value?: JSONValue
  description?: string
}

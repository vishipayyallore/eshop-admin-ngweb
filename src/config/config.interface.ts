import type { Environments } from "./environments.enum";
import type { JSONValue } from "~common/json";
import type { Endpoint } from "~/app/common/services/endpoint/endpoint.interface";



export interface Config {
  appName: string
  apiHost: string
  env: Environments
  endpoints: Array<Endpoint>
  [key: string ]: JSONValue | Array<Endpoint>
}

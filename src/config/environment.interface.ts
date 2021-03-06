import type { JSONValue } from "~common/json";
import type { Environments } from "./environments.enum";


export type Environment = BaseEnvironment & {
  production?: boolean
  isHeadless?: boolean
}

export interface BaseEnvironment {
  env: Environments
  [key: string]: JSONValue
}

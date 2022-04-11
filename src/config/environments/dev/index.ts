import type { Config } from "~/config/config.interface";
import { environment } from "~/environments/environment";
import { Environments } from "~config/environments.enum";
import { base } from "../base";
import { headless } from './headless' 
import { localDevelopment } from './local-development' 


export const dev: Config = {
  ...base,
  env: Environments.Development,
  ...(environment.isHeadless ? headless : localDevelopment),
}

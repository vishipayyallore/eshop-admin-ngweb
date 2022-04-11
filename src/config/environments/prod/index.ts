import { base } from "../base";
import { Environments } from "~config/environments.enum";
import { Config } from "~config/config.interface";


export const prod: Config = {
  ...base,
  env: Environments.Production
}

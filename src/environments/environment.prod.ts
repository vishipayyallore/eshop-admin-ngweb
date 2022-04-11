import { Environment } from "~/config/environment.interface";
import { Environments } from "~config/environments.enum";


export const environment: Environment = {
  env: Environments.Production,
  production: true
};

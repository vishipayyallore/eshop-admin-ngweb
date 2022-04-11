import { environment } from "~/environments/environment";
import { dev } from "./environments/dev";
import { prod } from "./environments/prod";


export default [dev, prod]
  .find(config => config.env === environment.env) ?? prod;
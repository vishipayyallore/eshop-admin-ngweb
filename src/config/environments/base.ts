import { Endpoint } from "~/app/common/services/endpoint/endpoint.interface";
import { Endpoints } from "./endpoints";

export const base = {
  appName: 'eshop-admin-ngweb',
  apiHost: 'http://productsapiv1.eastus.azurecontainer.io',
  cdnHost: 'http://eshopcdn.eastus.azurecontainer.io',
  endpoints: [
    {
      name: Endpoints.Products, 
      url: '/api/v1/products', 
      description: 'Retrieves all the products. Expensive call ;)'
    },
  ] as Array<Endpoint>
}

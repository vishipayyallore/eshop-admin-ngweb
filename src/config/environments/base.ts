import { HTTPRequestType } from "~/app/common/services/endpoint/http-request-type";
import { Endpoint } from "~common/services/endpoint/endpoint.interface";
import { Endpoints } from "./endpoints";

export const base = {
  appName: 'eshop-admin-ngweb',
  apiHost: 'http://productsapiv1.eastus.azurecontainer.io',
  cdnHost: 'https://stforeshop.blob.core.windows.net/productsimages/',
  endpoints: [
    {
      name: Endpoints.Products,
      type: HTTPRequestType.GET,
      url: '/api/v1/products',
      description: 'Retrieves all the products. Expensive call ;)'
    },
    {
      name: Endpoints.ProductsPost,
      type: HTTPRequestType.POST,
      url: '/api/v1/products',
      description: 'Create a new product'
    },
    {
      name: Endpoints.ProductsPut,
      type: HTTPRequestType.PUT,
      url: '/api/v1/products',
      description: 'Update an existing product'
    },
    {
      name: Endpoints.ProductsDelete,
      type: HTTPRequestType.DELETE,
      url: id => '/api/v1/products/${id}',
      description: 'Delete an existing product'
    },
  ] as Array<Endpoint>
}

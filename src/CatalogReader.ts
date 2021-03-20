import { Product } from "./Product";

export interface CatalogReader {
  getProducts(): Promise<Array<Product>>
}

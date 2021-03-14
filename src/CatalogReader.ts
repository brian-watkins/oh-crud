import { Product } from "./Product";

export interface CatalogReader {
  fetchProducts(): Promise<Array<Product>>
}

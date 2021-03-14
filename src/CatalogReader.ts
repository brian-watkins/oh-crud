import { Product } from "./Product";

export interface CatalogReader {
  fetchProducts(): Array<Product>
}

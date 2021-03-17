import { CatalogReader } from "./CatalogReader";
import { Product } from "./Product";

export class HttpCatalogReader implements CatalogReader {
  
  constructor(private host: string) {}
  
  async fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${this.host}/products`);
    return await response.json();
  }
}
import { render, screen } from "@testing-library/react"
import { Test } from "tape"
import { Product } from "../src/Product"
import { configureDisplay } from "../src/display/factory"
import { CatalogReader } from "../src/CatalogReader"

export class TestApp {
  private testCatalogReader: TestCatalogReader = new TestCatalogReader([])

  withProducts (products: Array<Product>): TestApp {
    this.testCatalogReader = new TestCatalogReader(products)
    return this
  }

  build(): TestApp {
    render(configureDisplay(this.testCatalogReader))
    return this
  }

  showsText(text: string): boolean {
    return screen.queryByText(text) !== null
  }

  async expectProductsToBeShown(t: Test, products: Array<Product>): Promise<void> {
    for (const product of products) {
      t.true(this.showsText(product.name), `Product name '${product.name}' is displayed`)
      t.true(this.showsText(product.price), `Product price '${product.price}' is displayed`)
    }
  }
}

class TestCatalogReader implements CatalogReader {
  constructor(private products: Array<Product>) {}

  fetchProducts(): Product[] {
    return this.products
  }
}
import { render, screen } from "@testing-library/react"
import { Test } from "tape"
import { Product } from "../src/Product"
import { configureApp } from "../src/display/appFactory"
import { setupWorker, rest, SetupWorkerApi } from 'msw'

export class TestApp {
  private worker?: SetupWorkerApi
  private testCatalogData: Product[] = []

  constructor(private test: Test) {}

  withProducts (products: Array<Product>): TestApp {
    this.testCatalogData = products
    return this
  }

  async build(): Promise<TestApp> {
    await navigator.serviceWorker.register("./helpers/mockServiceWorker.js", { scope: "/" })

    const handlers = [
      rest.get('http://someplace.com/products', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(this.testCatalogData))
      })
    ]

    this.worker = setupWorker(...handlers)
    await this.worker.start({
      quiet: true
    })

    await wait(50)

    render(configureApp({ catalogHost: "http://someplace.com" }))

    return this
  }

  showsText(text: string, name?: string) {
    this.test.true(screen.queryByText(text, { exact: false }) !== null, `${name || text} is displayed`)
  }

  async expectProductsToBeDisplayed(products: Array<Product>): Promise<void> {
    await wait(100)

    for (const product of products) {
      this.showsText(product.name, `Product name '${product.name}'`)
      this.showsText(product.price, `Product price '$${product.price}'`)
    }
  }
}

const wait = (timeout: number = 0): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}
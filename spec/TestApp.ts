import { cleanup, render, screen } from "@testing-library/react"
import { Assert } from "zora"
import { Product } from "../src/Product"
import { configureApp } from "../src/display/appFactory"
import { setupWorker, rest, SetupWorkerApi, DefaultRequestBody, MockedRequest, RestHandler } from 'msw'
import OpenApiResponseValidator from 'openapi-response-validator'
import catalogApiDoc from '../apiContracts/Catalog-Api.v1.json'

interface RequestData {
  path: string,
  method: string
}

export class TestApp {
  private worker?: SetupWorkerApi
  private testCatalogData: Product[] = []
  private requests: Map<string,RequestData> = new Map()

  constructor(private test: Assert) {}

  withProducts (products: Array<Product>): TestApp {
    this.testCatalogData = products
    return this
  }

  async start(): Promise<TestApp> {
    const handlers = [
      rest.get('http://someplace.com/products', (req, res, ctx) => {
        this.requests.set(req.id, { path: req.url.pathname, method: req.method })
        return res(ctx.status(200), ctx.json(this.testCatalogData))
      })
    ]

    await this.startHttpServer(handlers)

    render(configureApp({ catalogHost: "http://someplace.com" }))

    return this
  }

  stop() {
    cleanup()
  }

  private async startHttpServer(handlers: RestHandler<MockedRequest<DefaultRequestBody>>[]) {
    this.worker = setupWorker(...handlers)

    this.worker.on("response:mocked", async (res, reqId) => {
      const body = await res.json()
      const result = this.getResponseValidator(reqId).validateResponse(res.status, body)
      this.test.falsy(result, 'the getProducts response is valid')
    })

    await this.worker.start({
      quiet: true
    })

    const registration = await navigator.serviceWorker.ready

    if (registration.active.state !== "activated") {
      await new Promise<void>(resolve => {
        registration.active.addEventListener("statechange", (event: any) => {
          if (event.target.state === "activated") {
            resolve()
          }
        })
      })  
    }
  }

  private getResponseValidator(requestId: string) {
    const requestData = this.requests.get(requestId)
    return new OpenApiResponseValidator({
      responses: catalogApiDoc.paths[requestData.path][requestData.method.toLowerCase()].responses as any,
      components: catalogApiDoc.components as any,
    })
  }

  showsText(text: string, name?: string) {
    this.test.truthy(screen.queryByText(text, { exact: false }) !== null, `${name || text} is displayed`)
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
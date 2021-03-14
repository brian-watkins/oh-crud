import { createStore, Reducer } from "redux";
import { CatalogReader } from "../CatalogReader";
import { Product } from "../Product";

export interface AppState {
  products: Array<Product>
}

type FetchProducts = {
  type: "fetchProducts"
}

const InitialAppState: AppState = {
  products: [
    { productId: "0", name: "Super Product 0", price: "9.99" }
  ]
}

type AppAction
  = FetchProducts

function reducerFactory(catalogReader: CatalogReader): Reducer<AppState, AppAction> {
  return (state, action) => {
    return {
      products: catalogReader.fetchProducts()
    }
  }
}

export function configureStore(catalogReader: CatalogReader) {
  return createStore(reducerFactory(catalogReader))
}

// export default createStore(reducer)
import { Reducer, createStore, applyMiddleware } from "redux";
import { Product } from "../Product";
import createSagaMiddleware from 'redux-saga'
import { CatalogReader } from "../CatalogReader";
import { getProductsSaga } from "./getProductsSaga";

export interface AppState {
  products: Array<Product>
}

interface GotProducts {
  type: "gotProducts",
  products: Array<Product>
}

const InitialAppState: AppState = {
  products: []
}

export type AppAction
  = GotProducts

function reducerFactory(): Reducer<AppState, AppAction> {
  return (state, action) => {
    switch (action.type) {
      case "gotProducts":
        return Object.assign(state, { products: action.products })
      default:
        return InitialAppState
    }
  }
}

export function appStore(catalogReader: CatalogReader) {
  const sagaMiddleware = createSagaMiddleware()
  
  const store = createStore(reducerFactory(), applyMiddleware(sagaMiddleware))

  sagaMiddleware.run(getProductsSaga(catalogReader))

  return store
}
import { Reducer, createStore, applyMiddleware } from "redux";
import { Product } from "../Product";
import thunk from 'redux-thunk'

export interface AppState {
  products: Array<Product>
}

interface GotProducts {
  type: "gotProducts",
  products: Array<Product>
}

const InitialAppState: AppState = {
  products: [
    { productId: "0", name: "Super Product 0", price: "9.99" }
  ]
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

export function appStore() {
  return createStore(reducerFactory(), applyMiddleware(thunk))
}
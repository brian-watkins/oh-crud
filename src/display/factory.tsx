import React from "react";
import { Provider } from "react-redux";
import { CatalogReader } from "../CatalogReader";
import { Product } from "../Product";
import App from "./App";
import { configureStore } from './store'


export function configureDisplay(catalogReader: CatalogReader) {
  const store = configureStore(catalogReader)

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
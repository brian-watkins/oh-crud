import React from 'react'
import { Provider } from "react-redux"
import { HttpCatalogReader } from "../catalogReader/HttpCatalogReader"
import App from "./App"
import { appStore } from './store'

export interface AppConfiguration {
  catalogHost: string
}

export function configureApp(config: AppConfiguration) {
  const catalogReader = new HttpCatalogReader(config.catalogHost)
  const store = appStore(catalogReader)

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
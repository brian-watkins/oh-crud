import { Provider } from "react-redux"
import { HttpCatalogReader } from "../catalogReader/HttpCatalogReader"
import App from "./App"
import { appStore } from './store'

export interface AppConfiguration {
  catalogHost: string
}

export function configureApp(config: AppConfiguration) {
  const store = appStore()
  const catalogReader = new HttpCatalogReader(config.catalogHost)

  return (
    <Provider store={store}>
      <App catalogReader={catalogReader} />
    </Provider>
  )
}
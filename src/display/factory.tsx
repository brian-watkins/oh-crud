import { Provider } from "react-redux";
import { CatalogReader } from "../CatalogReader";
import App from "./App";
import { appStore } from './store'


export function configureDisplay(catalogReader: CatalogReader) {
  const store = appStore()

  return (
    <Provider store={store}>
      <App catalogReader={catalogReader} />
    </Provider>
  )
}
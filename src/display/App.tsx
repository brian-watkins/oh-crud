import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux'
import { CatalogReader } from '../CatalogReader';
import ProductList from './ProductList';
import { AppAction } from './store';

export interface AppProps {
  catalogReader: CatalogReader
}

function App(props: AppProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(async (send: Dispatch<AppAction>) => {
      const products = await props.catalogReader.fetchProducts()
      send({ type: "gotProducts", products })
    })
  })

  return (
    <main>
      <div className="App">
        Welcome to the store!
        </div>
      <ProductList />
    </main>
  );
}

export default App;
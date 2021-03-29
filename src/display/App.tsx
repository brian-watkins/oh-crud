import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductList from './ProductList';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: "getProducts" })
  }, [])

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
import React from 'react'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { Product } from '../Product'
import { AppState } from './store'

const selector: TypedUseSelectorHook<AppState> = useSelector

function ProductList() {
  const products: Array<Product> = selector(state => state.products)

  return (
    <ol>
      { products.map(productView) }
    </ol>
  )
}

function productView(product: Product) {
  return (
    <li key={product.id}>
      {product.name} costs ${product.price}
    </li>
  )
}

export default ProductList
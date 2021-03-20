import { put, apply, takeEvery } from 'redux-saga/effects'
import { CatalogReader } from '../CatalogReader'
import { Product } from '../Product'

function generateRequestProducts(catalogReader: CatalogReader) {
  return function*() {
    const products: Array<Product> = yield apply(catalogReader, catalogReader.getProducts, [])
    yield put({ type: "gotProducts", products })
  }
}

export function getProductsSaga(catalogReader: CatalogReader) {
  return function*() {
    yield takeEvery("getProducts", generateRequestProducts(catalogReader))
  }
}
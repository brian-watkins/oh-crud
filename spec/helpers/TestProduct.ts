import { Product } from '../../src/Product'

export function products(id: number): Product {
  return {
    id: `product-${id}`,
    name: `Super Product ${id}`,
    price: `${id}.25`
  }
}

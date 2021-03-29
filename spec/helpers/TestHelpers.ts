export function listOf<T> (count: number, generator: (id: number) => T): Array<T> {
  let items = []
  for (let i = 0; i < count; i++) {
    items.push(generator(i))
  }
  return items
}

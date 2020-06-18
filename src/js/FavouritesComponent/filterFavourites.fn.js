export function FilterFavourites(value, storage) {

  let filterArr

  switch (value) {
    case 'все':

      filterArr = storage.sort()
      break
    case 'цена по возрастанию':

      filterArr = storage.sort((a, b) => {
        return +a.price_total - +b.price_total
      })
      break

    case 'цена по убыванию':

      filterArr = storage.sort((a, b) => {
        return +b.price_total - +a.price_total
      })
      break
    case 'площадь по возрастанию':

      filterArr = storage.sort((a, b) => {
        return +a.square - +b.square
      })
      break
    case 'площадь по убыванию':

      filterArr = storage.sort((a, b) => {
        return +b.square - +a.square
      })
      break
  }

  return filterArr
}
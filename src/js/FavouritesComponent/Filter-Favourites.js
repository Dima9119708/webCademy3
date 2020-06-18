import { MainComponent } from '../core/MainComponent'

export class Filter_Favourites extends MainComponent {

  static className = 'filterFavourites'
  static tagName = 'div'

  constructor($root, options) {
    super($root, {
      name: 'Filter_Favourites',
      listener : ['change'],
      ...options
    })

    this.storage = options.storage
  }

  toHTML() {
    return `
      <div class="container p-0">
            <div class="heading-1">Избранное</div>
      </div>

      <div class="view-options-wrapper">
                <div class="container p-0">
                    <!-- view-options -->
                    <div class="view-options">
                        <div class="view-options__sort">
                            <label for="sort-cards-by" class="view-options__label">Сортировать</label>
                            <select id="sort-cards-by" name="" class="view-options__select">
                                <option value="все">Все</option>
                                <option value="цена по возрастанию">по цене ↑</option>
                                <option value="цена по убыванию">по цене ↓</option>
                                <option value="площадь по возрастанию">по площади ↑</option>
                                <option value="площадь по убыванию">по площади ↓</option>
                            </select>
                        </div>
                    </div>
                    <!-- // view-options -->
                </div>
      </div>
    `
  }

  onChange(event) {

    let filterArr
    const { value } = event.target

    switch (value) {
      case 'все':

        filterArr = this.storage.sort()
        break
      case 'цена по возрастанию' :

        filterArr = this.storage.sort((a, b) => {
          return +a.price_total - +b.price_total
        })
        break

      case 'цена по убыванию':

        filterArr = this.storage.sort((a, b) => {
          return +b.price_total - +a.price_total
        })
        break
      case 'площадь по возрастанию':

        filterArr = this.storage.sort((a, b) => {
          return +a.square - +b.square
        })
        break
      case 'площадь по убыванию':

        filterArr = this.storage.sort((a, b) => {
          return +b.square - +a.square
        })
        break
    }

    this.$emit('SORT_FILTER', filterArr)
  }
}
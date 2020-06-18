import { MainComponent } from '../core/MainComponent'
import { FilterFavourites } from './filterFavourites.fn'

export class Filter_Favourites extends MainComponent {

  static className = 'filterFavourites'
  static tagName = 'div'

  constructor($root, options) {
    super($root, {
      name: 'Filter_Favourites',
      listener : ['change'],
      ...options
    })
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

    const { value } = event.target
    const filterArr = FilterFavourites(value, this.store.getState())
    this.$emit('SORT_FILTER', filterArr)
  }
}
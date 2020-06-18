import { MainComponent } from '../core/MainComponent'
import { $ } from '../core/Dom'
import { ActiveRouter } from '../routing/ActiveRouter'
import { favoritesARR } from '../core/redux/actions'

export class Cards_Favourites extends MainComponent {

  static className = 'cards-wrapper'
  static tagName = 'div'

  constructor($root, options) {
    super($root, {
      name: 'Cards_Favourites',
      listener : ['click'],
      ...options
    })
    
    this.$root = $root
  }

  init() {
    super.init()

    this.DATAHTML()

    this.$subscribe('SORT_FILTER', data => {
      this.DATAHTML(data)
    })
  }

  toHTML() {
    return  `
      <div class="container p-0 pt-5">

        <!-- row -->
        <div class="row" data-append></div>
        <!-- // row -->

      </div>
    `
  }

  DATAHTML(value) {

    const data = value ? value : this.store.getState()

    const cards = data.map(obj => {

        return `
            <article class="col-md-4" data-id="${obj.id}">

            <div data-href="#items/${obj.id}" class="card">
                <div class="card__header">
                    <div class="card__title">
                        ${obj.complex_name}
                    </div>
                    <div class="card__like" data-like style="color: red">
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
                <div class="card__img">
                    <img src="${obj.image}" alt="План квартиры" />
                </div>
                <div class="card__desc">
                    <div class="card__price">
                        <div class="card__price-total">
                            ${obj.price_total} ₽
                        </div>
                        <div class="card__price-per-meter">
                                ${obj.price_sq_m} ₽/м2
                        </div>
                    </div>


                    <div class="card__params params">
                        <div class="params__item">
                            <div class="params__definition">
                                Комнат
                            </div>
                            <div class="params__value">${obj.rooms}</div>
                        </div>
                        <div class="params__item">
                            <div class="params__definition">
                                Площадь
                            </div>
                            <div class="params__value">${obj.square}</div>
                        </div>
                    </div>

                </div>
                <div class="card__footer">
                    <div class="card__art">${obj.scu}</div>
                    <div class="card__floor">Этаж 4 из 12</div>
                </div>
            </div>

        </article>
    `
    })

    $(this.$root)
        .querySelector('[data-append]')
        .clear()
        .insertHTML('beforeend', cards.join('') || 'В избранном ничего нет')
    }

  onClick() {

    const card = $(event.target).parent('[data-id]')
    const like = $(event.target).parent('[data-like]')

    if (like) {

        const id = $(card).attr('id')

        const storage = this.store.getState()

        storage.forEach( (elem, index) => {
            if (elem.id === id) {
                storage.splice(index, 1)
            }
        });

        this.$dispatch(favoritesARR(storage))
        ActiveRouter.reload

    } else if (card) {
        event.preventDefault()
        const { dataset } = card.querySelector('[data-href]')
        ActiveRouter.setHash = dataset.href
        ActiveRouter.reload
    }
  }
}
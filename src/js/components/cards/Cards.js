import { MainComponent } from "../../core/MainComponent";
import { $ } from "../../core/Dom";
import { ActiveRouter } from "../../routing/ActiveRouter";
import { favoritesARR } from "../../core/redux/actions";
import { storage } from "../../core/storage/localStorage";

export class Cards extends MainComponent {

  static className = 'cards-wrapper'
  static tagName = 'div'

  constructor($root, options) {
    super($root, {
    listener : ['click'],
    ...options
    })

    this.$root = $root
    this.DATA = []
  }


  init() {
    super.init()

    this.$subscribe('DATA', data => {
        this.DATA = data
        this.DATAHTML(data)
    })
  }

  toHTML() {
    return `
    <div class="container p-0 pt-5">

        <!-- row -->
        <div class="row" data-append></div>
        <!-- // row -->

    </div>
    `
  }

  DATAHTML(data) {
    const cards = data.map(obj => {

        const DATAStorage = storage('DATA') || []
        let boolean

        DATAStorage.forEach(elem => {
            if (elem.id === obj.id) {
                boolean = elem.favorites
            }
        })

        const booleanIF = boolean ? boolean : false
        const color = boolean ? 'red' : '#ececec'

        return `
            <article class="col-md-4" data-id="${obj.id}">

            <div data-href="#items/${obj.id}" class="card">
                <div class="card__header">
                    <div class="card__title">
                        ${obj.complex_name}
                    </div>
                    <div class="card__like" data-like="${booleanIF}" style="color:${color}">
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
        .insertHTML('beforeend', cards.join(''))
  }

  onClick(event) {

    const card = $(event.target).parent('[data-id]')
    const like = $(event.target).parent('[data-like]')
    const favorites = []

    if (like) {
        const id = $(card).attr('id')

        const flag = JSON.parse($(like).attr('like')) === false
                     ? true
                     : false

        if (storage('DATA') && storage('DATA').length > 0) {

            storage('DATA').forEach(obj => {

                this.DATA.forEach((elem, index) => {
                    if (obj.id === elem.id) {
                        this.DATA.splice(index, 1, obj)
                    }
                })
            })
        }

        this.DATA = this.DATA.map(elem => {
            if (elem.id === id) {
                return { ...elem, favorites: flag}
            } else {
                return elem
            }
        })

        this.DATA.forEach(elem => {
            if (elem.favorites) {
                favorites.push(elem)
            }
        })

        this.$dispatch(favoritesARR(favorites))

        if (flag) {
            $(like).css({
                color: 'red'
            })
        } else {
            $(like).css({
                color: '#ececec'
            })
        }

        $(like).attr('data-like', `${flag}`)

    } else if (card) {
        event.preventDefault()
        const { dataset } = card.querySelector('[data-href]')
        ActiveRouter.setHash = dataset.href
        ActiveRouter.reload
    }
  }
}
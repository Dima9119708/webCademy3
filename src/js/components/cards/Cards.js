import { MainComponent } from "../../core/MainComponent";
import { $ } from "../../core/Dom";
import { ActiveRouter } from "../../routing/ActiveRouter";

export class Cards extends MainComponent {

  static className = 'cards-wrapper'
  static tagName = 'div'

  constructor($root, options) {
    super($root, {
    listener : ['click'],
    ...options
    })

    this.$root = $root
  }


  init() {
    super.init()

    this.$subscribe('DATA', data => {
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

        return `
            <article class="col-md-4" data-id="${obj.id}">

            <a data-href href="#items/${obj.id}" class="card">
                <div class="card__header">
                    <div class="card__title">
                        ${obj.complex_name}
                    </div>
                    <div class="card__like">
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
            </a>

        </article>
    `
    })

    $(this.$root)
        .querySelector('[data-append]').clear()

    $(this.$root)
        .querySelector('[data-append]')
        .insertHTML('beforeend', cards.join(''))
  }

  onClick(event) {

    const card = $(event.target).parent('[data-id]')

    if (card) {
        event.preventDefault()
        const { hash } = card.querySelector('[data-href]')
        ActiveRouter.setHash = hash
        ActiveRouter.reload
    }
  }
}
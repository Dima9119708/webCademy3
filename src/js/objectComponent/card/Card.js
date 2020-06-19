import { MainComponent } from "../../core/MainComponent";
import { $ } from "../../core/Dom";
import { favoritesARR } from "../../core/redux/actions";
import { Modal } from "../../core/Modal";

export class Card extends MainComponent {

  static className = 'container p-0'
  static tagName = 'div'

  constructor($root, options) {
    super($root, {
      name: 'Card',
      listener : ['click'],
      ...options
    })

    this.$root = $root
    this.card = options.card,
    this.storage = this.store.getState()
    this.modal = new Modal()
  }

   toHTML() {
    return this.cardHTML()
   }

   cardHTML() {
        let inFavorites = ''
        let notFavorites = ''

       if (!this.storage.length) {
           notFavorites = 'button-favourite--active'
       }

       const storage = this.storage
                            .filter(elem => elem.id === this.card.id)
                            .filter(elem => elem !== undefined)

       if (storage.length > 0) {
            inFavorites = 'button-favourite--active'
        }
        else {
            notFavorites = 'button-favourite--active'
        }

        return `
             <div class="heading-1" data-id="${this.card.id}">
                  Студия, ${this.card.square} м2 за ${this.card.price_total} ₽
              </div>

                <!-- object -->
                <div class="object">
                    <!-- object__photo -->
                    <div class="object__photo">
                        <div class="object__photo-wrapper">
                            <img src="${this.card.image}" alt="" />
                        </div>
                    </div>
                    <!-- // object__photo -->

                    <!-- object__desc -->
                    <div class="object__desc">
                        <div class="object__desc-sector">
                            ${this.card.complex_name}
                        </div>

                        <div class="object__desc-name">
                            <div class="object__desc-title">
                                Студия, ${this.card.square} м2
                            </div>
                            <div class="object__desc-art">${this.card.scu}</div>

                            <!-- Добавить в избранное -->
                            <button class="button-favourite ${notFavorites}" data-notFavorites="notFavorites">
                                <i class="fas fa-heart"></i> <span>Не в избранном</span>
                            </button>

                            <!-- В Избранном -->
                            <button class="button-favourite ${inFavorites}" data-inFavorites="inFavorites">
                                <i class="fas fa-heart"></i> <span>В избранном</span>
                            </button>

                        </div>

                        <div class="object__desc-details">
                            <!-- params -->
                            <div class="params">
                                <div class="params__item">
                                    <div class="params__definition">Корпус</div>
                                    <div class="params__value">${this.card.floor}</div>
                                </div>
                                <div class="params__item">
                                    <div class="params__definition">Этаж</div>
                                    <div class="params__value">${this.card.floors_total}</div>
                                </div>
                                <div class="params__item">
                                    <div class="params__definition">Номер</div>
                                    <div class="params__value">${this.card.flat_number}</div>
                                </div>
                                <div class="params__item">
                                    <div class="params__definition">Комнат</div>
                                    <div class="params__value">${this.card.rooms}</div>
                                </div>
                            </div>
                            <!-- // params -->
                        </div>

                        <div class="details">
                            <div class="details__row">
                                <div class="details__name">Стоимость</div>
                                <div
                                    class="details__value details__value--price"
                                >
                                    ${this.card.price_total} ₽
                                </div>
                            </div>
                            <div class="details__row">
                                <div class="details__name">Цена за м2</div>
                                <div class="details__value"> ${this.card.price_sq_m} ₽/м2</div>
                            </div>
                            <div class="details__row">
                                <div class="details__name">Площадь</div>
                                <div class="details__value">${this.card.square} м2</div>
                            </div>
                        </div>

                        <button class="button-order" data-order>Забронировать</button>
                        <!-- <button class="button-preview">Записаться на просмотр</button> -->
                    </div>
                    <!-- // object__desc -->
                </div>
                <!-- // object -->
            </div>

            <div class="container">
                <a href="index.html" class="back-to-results"
                    >← Вернуться к результатам поиска</a
                >
            </div>
        <!-- // content-wrapper -->
    `
   }

   onClick(event) {

       const notFavorites = $(event.target).parent('[data-notFavorites]')
       const inFavorites = $(event.target).parent('[data-inFavorites]')
       const order = $(event.target).parent('[data-order]')

       if (notFavorites) {

           $(notFavorites).addClass('button-favourite--active')
           const inFavorites = $(this.$root).querySelector('[data-inFavorites]')
           inFavorites.removeClass('button-favourite--active')

           this.storage.forEach( (elem, index) => {

               if (elem.id === this.card.id) {
                   this.storage.splice(index, 1)
               }
           })

           this.$dispatch(favoritesARR(this.storage))

       } else if (inFavorites) {

           $(inFavorites).addClass('button-favourite--active')
           const notFavorites = $(this.$root).querySelector('[data-notFavorites]')
           notFavorites.removeClass('button-favourite--active')

           if (this.storage.length < 1) {
               this.storage.push(this.card)
           }

           this.storage.forEach(elem => {
               if (JSON.stringify(elem) !== JSON.stringify(this.card)) {
                   this.storage.push(this.card)
               }
           })

           this.$dispatch(favoritesARR(this.storage))
       } else if (order) {

            $(this.$root).append(this.modal.open(this.card))
            this.modal.init(this.$root)

       }

   }
}
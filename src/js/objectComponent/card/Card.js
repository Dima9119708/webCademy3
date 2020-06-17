import { MainComponent } from "../../core/MainComponent";

export class Card extends MainComponent {

  static className = 'container p-0'
  static tagName = 'div'

  constructor($root, options) {
    super($root, {
      name: 'Card',
      listener : ['click']
    })

    this.card = options.card
  }

  toHTML() {
    return `
             <div class="heading-1">
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
                            <button class="button-favourite">
                                <i class="fas fa-heart"></i> <span>В избранное</span>
                            </button>

                            <!-- В Избранном -->
                            <button class="button-favourite button-favourite--active">
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

                        <button class="button-order">Забронировать</button>
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

  onClick() {

  }
}
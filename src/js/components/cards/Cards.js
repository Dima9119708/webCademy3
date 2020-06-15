import { MainComponent } from "../../core/MainComponent";

export class Cards extends MainComponent {

  static className = 'cards-wrapper'
  static tagName = 'div'

  toHTML() {
    return `
                <div class="container p-0 pt-5">

                    <!-- row -->
                    <div class="row">

                        <!-- <article class="col-md-4">

                            <a href="object.html" class="card">
                                <div class="card__header">
                                    <div class="card__title">
                                        ЖК Генеральский
                                    </div>
                                    <div class="card__like">
                                        <i class="fas fa-heart"></i>
                                    </div>
                                </div>
                                <div class="card__img">
                                    <img src="././././img/flat-plan.png" alt="План квартиры" />
                                </div>
                                <div class="card__desc">
                                    <div class="card__price">
                                        <div class="card__price-total">
                                            4 200 000 ₽
                                        </div>
                                        <div class="card__price-per-meter">
                                            64 000 ₽/м2
                                        </div>
                                    </div>


                                    <div class="card__params params">
                                        <div class="params__item">
                                            <div class="params__definition">
                                                Комнат
                                            </div>
                                            <div class="params__value">1</div>
                                        </div>
                                        <div class="params__item">
                                            <div class="params__definition">
                                                Площадь
                                            </div>
                                            <div class="params__value">56</div>
                                        </div>
                                    </div>

                                </div>
                                <div class="card__footer">
                                    <div class="card__art">ГЕН-112-42</div>
                                    <div class="card__floor">Этаж 4 из 12</div>
                                </div>
                            </a>

                        </article>

                    </div>
                    <!-- // row -->

                </div>
    `
  }
}
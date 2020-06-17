import { MainComponent } from "../../core/MainComponent";
import { $ } from "../../core/Dom";
import { filter, filterCheckbox, changeParams, filterINPUT } from './filter.functions'
import { defaultParams } from '../../core/defaultParams'
import { DOM_FILTER } from './FilterDom'

export class Filter extends MainComponent {

  static className = 'container p-0'
  static tagName = 'form'

    constructor($root, options) {
        super($root, {
            name: 'Filter',
            listener: ['change','click', 'input'],
            ...options
        })

        this.$root = $root

        this.DATA = options.DATA
        this.groupCheckbox = []
        this.defaultParams = {...defaultParams}
        this.records = []

        this.DOM_FILTER = {...DOM_FILTER}
    }

    init() {
        super.init()

        this.show = this.$root.querySelector('[data-show]')
        this.showHTML(this.DATA)
        this.records = [...this.DATA]
    }

    showHTML(array) {
        if (!array.length) {
            $(this.show).html(`Обьекты не найдены`)
        }
        else {
            $(this.show).html(`Показать ${array.length} объектов`)
        }

    }

    toHTML() {
        return `

                <div class="heading-1">Выбор квартир:</div>
                    <div class="filter">
                        <div class="filter__col">
                            <div class="filter__label">Выбор проекта:</div>
                            <select name="complex" id="filter__dropdown" class="filter__dropdown">
                                <option value="all" selected>Все проекты</option>
                                <option value="Генеральский"
                                    >ЖК Генеральский</option
                                >
                                <option value="Речной">ЖК Речной</option>
                                <option value="Лесной">ЖК Лесной</option>
                                <option value="Квантум">ЖК Квантум</option>
                            </select>
                        </div>
                        <div class="filter__col rooms">
                            <div class="filter__label">Комнат:</div>
                            <div class="rooms__wrapper" id="rooms">
                                <input
                                    name="rooms"
                                    type="checkbox"
                                    id="rooms_1"
                                    class="rooms__checkbox"
                                    value="1"
                                /><label for="rooms_1" class="rooms__btn">1</label>
                                <input
                                    name="rooms"
                                    type="checkbox"
                                    id="rooms_2"
                                    class="rooms__checkbox"
                                    value="2"
                                /><label for="rooms_2" class="rooms__btn">2</label>
                                <input
                                    name="rooms"
                                    type="checkbox"
                                    id="rooms_3"
                                    class="rooms__checkbox"
                                    value="3"
                                /><label for="rooms_3" class="rooms__btn">3</label>
                                <input
                                    name="rooms"
                                    type="checkbox"
                                    id="rooms_4"
                                    class="rooms__checkbox"
                                    value="4"
                                /><label for="rooms_4" class="rooms__btn">4</label>
                                <input
                                    name="rooms"
                                    type="checkbox"
                                    id="rooms_5"
                                    class="rooms__checkbox"
                                    value="5"
                                /><label for="rooms_5" class="rooms__btn">5</label>
                            </div>
                        </div>
                        <div class="filter__col" data-sq>
                            <div class="filter__label">Площадь:</div>
                            <div class="range__wrapper">
                                <label class="range">
                                    <div for="" class="range__label">от</div>
                                    <input
                                        name="sqmin"
                                        min="${defaultParams.sqmin}"
                                        type="number"
                                        class="range__input"
                                        placeholder="${defaultParams.sqmin}"
                                    />
                                    <div class="range__value">м2</div>
                                </label>
                                <label class="range">
                                    <div for="" class="range__label">до</div>
                                    <input
                                        name="sqmax"
                                        max="${defaultParams.sqmax}"
                                        type="number"
                                        class="range__input"
                                        placeholder="${defaultParams.sqmax}"
                                    />
                                    <div class="range__value">м2</div>
                                </label>
                            </div>
                        </div>
                        <div class="filter__col" data-price>
                            <div class="filter__label">Стоимость:</div>
                            <div class="range__wrapper">
                                <div class="range">
                                    <label for="" class="range__label">от</label>
                                    <input
                                        type="number"
                                        name="pricemin"
                                        class="range__input range__input--price"
                                        placeholder="${defaultParams.pricemin}"
                                    />
                                    <div class="range__value">₽</div>
                                </div>
                                <div class="range">
                                    <label for="" class="range__label">до</label>
                                    <input
                                        type="number"
                                        name="pricemax"
                                        class="range__input range__input--price"
                                        placeholder="${defaultParams.pricemax}"
                                    />
                                    <div class="range__value">₽</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="filter__buttons">
                        <button data-show="show" class="filter__show"></button>
                        <button data-reset="reset" class="filter__reset">Сбросить фильтр</button>
                    </div>
        `
    }

    onChange(event) {
        event.preventDefault()

        const { target } = event

        if (target.id === 'filter__dropdown') {

            this.defaultParams = changeParams(
                                this.defaultParams,
                                target.value,
                                'complex',)

            this.records = filter(this.defaultParams,this.DATA)
            this.showHTML(this.records)
        }
        else if (target.closest('#rooms')) {

            this.defaultParams = changeParams(
                                this.defaultParams,
                                filterCheckbox(target, this.groupCheckbox),
                                'rooms')

            this.records = filter(this.defaultParams, this.DATA)
            this.showHTML(this.records)
        }
    }

    onClick(event) {

        const show = $(event.target).attr('show')
        const reset = $(event.target).attr('reset')

        if (reset) {
            event.preventDefault()

            this.$root.querySelector(this.DOM_FILTER.dropdown).selectedIndex = 0

            Array
                .from(this.$root.querySelector(this.DOM_FILTER.rooms).children)
                .forEach(elem => {

                elem.checked = false
            });


            this.$root.querySelector(this.DOM_FILTER.sqmin).value = ''
            this.$root.querySelector(this.DOM_FILTER.sqmax).value = ''
            this.$root.querySelector(this.DOM_FILTER.pricemin).value = ''
            this.$root.querySelector(this.DOM_FILTER.pricemax).value = ''

            this.records = [...this.DATA]
            this.showHTML(this.DATA)
        }
        else if (show) {
            event.preventDefault()
            this.$emit('DATA', this.records)
        }

    }

    onInput(event) {

        const square = $(event.target).parent('[data-sq]')
        const price = $(event.target).parent('[data-price]')

        if (square) {

            const { sqmin, sqmax } = defaultParams

            this.inputDATA(
                    sqmin,
                    sqmax,
                    this.DOM_FILTER.sqmin,
                    this.DOM_FILTER.sqmax,
                    "sqmin",
                    "sqmax"
                )

        } else if (price) {

            const { pricemin, pricemax } = defaultParams

            this.inputDATA(
                        pricemin,
                        pricemax,
                        this.DOM_FILTER.pricemin,
                        this.DOM_FILTER.pricemax,
                        "pricemin",
                        "pricemax"
                    )
        }
    }

    inputDATA(params_MIN, params_MAX, DOM_MIN, DOM_MAX, str_MIN, str_MAX ) {

        const DOM = {
            min: this.$root.querySelector(`${DOM_MIN}`),
            max: this.$root.querySelector(`${DOM_MAX}`),
        }

        this.defaultParams = filterINPUT(
                        event,
                        DOM.min,
                        DOM.max,
                        this.defaultParams,
                        params_MIN,
                        params_MAX,
                        str_MIN,
                        str_MAX,
        )
        this.records = filter(this.defaultParams, this.DATA)
        this.showHTML(this.records)
    }
}
import { MainComponent } from "../../core/MainComponent";
import { $ } from "../../core/Dom";
import { ActiveRouter } from "../../routing/ActiveRouter";

export class Header extends MainComponent{

  static className = 'top-panel'
  static tagName = 'header'

  constructor($root, options) {
    super($root, {
      name: 'Filter',
      listener: ['click'],
      ...options
    })

    this.$root = $root
  }

  toHTML() {
    return `
              <div class="top-panel__container">
                  <div class="top-panel__title">
                      интернет магазин недвижимости
                  </div>
                  <!-- <div class="top-panel__phone"><a href="tel:+8800557755">8 (800) 55-77-55</a></div> -->

                  <div class="top-panel__favourites" data-app="app">
                      <button class="btn-show-favourites" data-app="app">
                          Заявки
                      </button>
                  </div>

                  <div class="top-panel__favourites" data-favourites="favourites">
                      <button class="btn-show-favourites" data-favourites="favourites">
                          <i class="fas fa-heart" data-favourites="favourites"></i> Избранное
                      </button>
                  </div>
              </div>
    `
  }

  onClick(event) {

    const favourites = $(event.target).attr('favourites')
    const bids = $(event.target).attr('app')

    if (favourites) {
      ActiveRouter.setHash = 'favourites/'
      this.destroyEventListener()
      ActiveRouter.reload
    }
    else if (bids) {
      ActiveRouter.setHash = 'bids/'
      this.destroyEventListener()
      ActiveRouter.reload
    }
  }
}
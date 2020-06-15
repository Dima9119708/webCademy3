import { MainComponent } from "../../core/MainComponent";

export class Header extends MainComponent{

  static className = 'top-panel'
  static tagName = 'header'

  toHTML() {
    return `
              <div class="top-panel__container">
                  <div class="top-panel__title">
                      интернет магазин недвижимости
                  </div>
                  <!-- <div class="top-panel__phone"><a href="tel:+8800557755">8 (800) 55-77-55</a></div> -->

                  <div class="top-panel__favourites">
                      <button class="btn-show-favourites">
                          <i class="fas fa-heart"></i> Избранное
                      </button>
                  </div>
              </div>
    `
  }
}
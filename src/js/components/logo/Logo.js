import { MainComponent } from "../../core/MainComponent";

export class Logo extends MainComponent {

  static className = 'logo-wrapper'
  static tagName = 'div'

  toHTML() {
    return `
          <a href="index.html" class="logo">
              <div class="logo__title">КВАДРАТНЫЙ МЕТР</div>
              <div class="logo__subtitle">
                  купить квартиру в один клик
              </div>
          </a>
    `
  }
}
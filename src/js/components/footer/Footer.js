import { MainComponent } from "../../core/MainComponent";

export class Footer extends MainComponent {

  static className = 'footer'
  static tagName = 'footer'

  toHTML() {
    return `
      <div class="contaier">
          <p>
              Учебный проект школы
              <a href="https://webcademy.ru/">WebCademy</a> с курса
              <a href="https://webcademy.ru/jscourse/"
                  >JavaScript разработка</a
              >. Проект выполнил <a href="#">Сергей Васильев</a>.
          </p>
      </div>
    `
  }
}
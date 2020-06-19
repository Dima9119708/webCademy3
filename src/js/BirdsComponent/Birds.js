import { MainComponent } from "../core/MainComponent";

export class Birds extends MainComponent {

  static className = 'birds'
  static tagName = 'div'

  constructor($root, options) {
    super($root, {
      ...options
    })

    this.data = options.DATA
  }

  birdsHTML() {

    const birds = this.data

    const sendArr = birds.map(elem => {

      return `
          <div class="panel panel--no-hover">
                          <div class="panel__bidname">${elem.name}</div>
                          <div class="panel__bidphone">${elem.phone}</div>
          </div>
          `
    });

    return `
      <div class="content-wrapper">
            <!-- top-panel -->

            <div class="container p-0 mb-5">
                <div class="heading-1">Заявки</div>
            </div>

            <!-- panels-wrapper -->
            <div class="panels-wrapper">
                <div class="container p-0">
                    <!-- panel -->
                    ${sendArr.join('') || 'Заявок нет'}
                    <!-- // panel -->
                </div>
            </div>
            <!-- // panels-wrapper -->
      </div>
    `
  }

  toHTML() {
    return this.birdsHTML()
  }
}
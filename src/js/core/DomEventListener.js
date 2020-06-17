import { $ } from "./Dom"

const prefix = (listener) => {
  return 'on' + listener[0].toUpperCase() + listener.slice(1)
}

export class DomEventListener {
  constructor(component, options) {
    this.component = $(component)

    this.name = options.name
    this.listener = options.listener || []
  }

  initListener() {

    this.listener.forEach(listener => {
      const metod = prefix(listener)

      if (!this[metod]){
        throw new Error(`метода ${metod} нет у компонента ${this.name}`)
      }

      this[metod] = this[metod].bind(this)
      this.component.on(listener, this[metod])
    })
  }

  destroy() {
    this.listener.forEach(listener => {
      const metod = prefix(listener)
      this.component.off(listener, this[metod])
    })
  }
}
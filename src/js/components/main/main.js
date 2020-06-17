import { $ } from "../../core/Dom"
import { Emitter } from "../../core/Emmiter"

export class Main {

  constructor(components = [], DATA) {
    this.components = components
    this.DATA = DATA
    this.emmiter = new Emitter()
  }

  getRoot() {

    const main = $.create('div', 'main')

    const options = {
      DATA: this.DATA,
      emmiter: this.emmiter
    }

    this.components = this.components.map(Component => {

      const componentParent = $.create(Component.tagName, Component.className)
      const component = new Component(componentParent, options)
      componentParent.innerHTML = component.toHTML()
      main.append(componentParent)

      return component
    })

    return main
  }

  init() {
    this.components.forEach(Component => Component.init())
  }

  destroy() {
    this.components.forEach(Component => Component.destroyEventListener())
  }
}
import { $ } from "../../core/Dom"

export class Main {

  constructor(components = [], DATA) {
    this.components = components
    this.DATA = DATA
  }

  getRoot() {

    const main = $.create('div', 'main')

    const options = {
      DATA: this.DATA
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
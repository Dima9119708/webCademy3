import { $ } from "../../core/Dom"

export class MainObject {
  constructor(components, DATA) {
    this.components = components,
    this.data = DATA
  }

  getRoot() {

    const main = $.create('div', 'main')

    const options = {
      card: this.data
    }

    this.components = this.components.map( Component => {
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
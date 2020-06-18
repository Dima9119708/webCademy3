import { $ } from "../core/Dom"
import { storage } from "../core/storage/localStorage"
import { Emitter } from "../core/Emmiter"

export class MainFavourites {

  constructor(components = []) {
    this.components = components
    this.emmiter = new Emitter()
  }

  getRoot() {

    const main = $.create('div', 'main')

    const options = {
      storage : storage('DATA'),
      emmiter : this.emmiter
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
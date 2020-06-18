import { $ } from "../../core/Dom"
import { Emitter } from "../../core/Emmiter"
import { reducer } from "../../core/redux/reducer"
import { Store } from '../../core/redux/Store'
import { storage } from "../../core/storage/localStorage"

export class Main {

  constructor(components = [], DATA) {
    this.components = components
    this.DATA = DATA
    this.emmiter = new Emitter()
    this.store = new Store(reducer, storage('DATA') || {})
    this.data = DATA
  }

  getRoot() {

    const main = $.create('div', 'main')

    const options = {
      DATA: this.DATA,
      emmiter: this.emmiter,
      store: this.store,
      card: this.data
    }

    this.components = this.components.map(Component => {

      const componentParent = $.create(Component.tagName, Component.className)
      const component = new Component(componentParent, options)
      componentParent.innerHTML = component.toHTML()
      main.append(componentParent)

      return component
    })

    this.store.subscribeStore(data => {
      storage('DATA', data.data)
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
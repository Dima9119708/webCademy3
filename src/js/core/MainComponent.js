import { DomEventListener } from "./DomEventListener";

export class MainComponent extends DomEventListener {

  constructor($root, options = {}) {
    super($root, options)

    this.emmiter = options.emmiter
    this.store = options.store
  }

  toHTML() {

  }

  $emit(name, ...args) {
    this.emmiter.emit(name, ...args)
  }

  $subscribe(name, fn) {
    this.emmiter.subscribe(name, fn)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  init() {
    this.initListener()
  }

  destroyEventListener() {
    this.destroy()
  }
}
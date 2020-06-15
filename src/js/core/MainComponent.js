import { DomEventListener } from "./DomEventListener";

export class MainComponent extends DomEventListener {

  constructor($root, options = {}) {
    super($root, options)
  }

  toHTML() {

  }

  init() {
    this.initListener()
  }

  destroyEventListener() {
    this.destroy()
  }
}
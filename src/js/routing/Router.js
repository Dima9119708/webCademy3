import { ActiveRouter } from "./ActiveRouter"
import { $ } from "../core/Dom"
import { preloader } from "../preloader/preloader"

export class Router {
  constructor(selector, pages = {} ) {
    this.$root = $(selector)
    this.pages = pages
    this.preloader = preloader

    this.init()
  }

  init() {
    this.changePageHandler()
  }

  async changePageHandler() {

    const Page = this.pages.main
    const page = new Page()

    this.$root.clear().append(this.preloader())

    const getDATA = await page.getRoot()

    this.$root.clear().append(getDATA)
    page.initListener()
  }

}
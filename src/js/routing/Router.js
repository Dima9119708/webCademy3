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

    let Page

    if (ActiveRouter.hash === '') {
      Page = this.pages.main
    }
    else if (ActiveRouter.hash.startsWith('items/')) {
      Page = this.pages.card
    }
    else if (ActiveRouter.hash.startsWith('favourites/')) {
      Page = this.pages.favourites
    }

    this.changePageHandler(Page)
  }

  async changePageHandler(Page) {

    const page = new Page(ActiveRouter.params)

    this.$root.clear().append(this.preloader())

    const getDATA = await page.getRoot()

    this.$root.clear().append(getDATA)
    page.initListener()
  }

}
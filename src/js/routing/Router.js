import { ActiveRouter } from "./ActiveRouter"
import { $ } from "../core/Dom"
import { preloader } from "../preloader/preloader"

export class Router {
  constructor(selector, pages = {} ) {
    this.$root = $(selector)
    this.pages = pages
    this.preloader = preloader

    this.init()

    this.Page = null
  }

  init() {


    if (ActiveRouter.hash === '') {
      this.Page = this.pages.main
    }
    else if (ActiveRouter.hash.startsWith('items/')) {
      this.Page = this.pages.card
    }
    else if (ActiveRouter.hash.startsWith('favourites/')) {
      
      this.Page = this.pages.favourites

    } else if (ActiveRouter.hash.startsWith('bids/')) {

      this.Page = this.pages.bids
    }
     else {
      this.Page = this.pages.main
    }

    this.changePageHandler()
  }

  async changePageHandler() {

    const Page = this.Page

    const page = new Page(ActiveRouter.params)

    this.$root.clear().append(this.preloader())

    const getDATA = await page.getRoot()

    this.$root.clear().append(getDATA)
    page.initListener()
  }

}
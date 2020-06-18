import { PagesIntarface } from './PagesInterface'
import { Header } from '../components/header/header'
import { Logo } from '../components/logo/Logo'
import { Filter_Favourites } from '../FavouritesComponent/Filter-Favourites'
import { Cards_Favourites } from '../FavouritesComponent/Cards-Favourites'
import { Footer } from '../components/footer/Footer'
import { Main } from '../components/main/main'

export class FavouritesPage extends PagesIntarface {

  getRoot() {

    this.main = new Main(
      [Header,Logo,Filter_Favourites, Cards_Favourites, Footer],
    )

    return this.main.getRoot()
  }

  initListener() {
    this.main.init()
  }

  destroyDelete() {
    this.main.destroy()
  }

}
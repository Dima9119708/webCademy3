import '../less/main.less'
import '@babel/polyfill'
import { Router } from './routing/Router'
import { MainPages } from './pages/mainPages'
import { CardPage } from './pages/CardPage'
import { FavouritesPage } from './pages/FavouritesPages'


const router = new Router('#app', {
  main : MainPages,
  card : CardPage,
  favourites : FavouritesPage,
})
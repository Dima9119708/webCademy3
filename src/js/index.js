import '../less/main.less'
import '@babel/polyfill'
import { Router } from './routing/Router'
import { MainPages } from './pages/mainPages'


const router = new Router('#app', {
  main : MainPages,
})
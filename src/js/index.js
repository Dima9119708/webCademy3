import '../less/main.less'
import '@babel/polyfill'
import { Router } from './routing/Router'
import { MainPages } from './pages/mainPages'
import { CardPage } from './pages/CardPage'
import { FavouritesPage } from './pages/FavouritesPages'
import { BidsPage } from './pages/BidsPage'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
  authDomain: "webcademy-4d182.firebaseapp.com",
  databaseURL: "https://webcademy-4d182.firebaseio.com",
  projectId: "webcademy-4d182",
  storageBucket: "webcademy-4d182.appspot.com",
  messagingSenderId: "210506379396",
  appId: "1:210506379396:web:91c1ce124efad0a6bd52d1"
});


const router = new Router('#app', {
  main : MainPages,
  card : CardPage,
  favourites : FavouritesPage,
  bids: BidsPage
})



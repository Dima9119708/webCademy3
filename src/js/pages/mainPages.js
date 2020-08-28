import { PagesIntarface } from "./PagesInterface";
import { Main } from '../components/main/main'
import { Header } from '../components/header/header'
import { Logo } from '../components/logo/Logo'
import { Filter } from '../components/forma/Filter'
import { Cards } from '../components/cards/Cards'
import { Footer } from '../components/footer/Footer'

import firebase from 'firebase/app';
import 'firebase/database';

function DATA () {
  return new Promise((resolve,reject) => {

    try {
      firebase
          .database()
          .ref(`/`)
          .on('value', function (dataSnapshot) {
            resolve(dataSnapshot.val())
          })
    }
    catch (err) {
      reject(err)
    }
  })
}

export class MainPages extends PagesIntarface {

  async getRoot() {

    const GET_DATA = await DATA()

    this.main = new Main(
        [Header, Logo, Filter, Cards, Footer],
        GET_DATA
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
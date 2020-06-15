import { PagesIntarface } from "./PagesInterface";
import { Main } from '../components/main/main'
import { Header } from '../components/header/header'
import { Logo } from '../components/logo/Logo'
import { Filter } from '../components/forma/Filter'
import { Cards } from '../components/cards/Cards'
import { Footer } from '../components/footer/Footer'
import { fetchDATA } from "../Fetch/fetchData";


export class MainPages extends PagesIntarface {

  async getRoot() {

    const GET_DATA = await fetchDATA('http://jsproject.webcademy.ru/items','MainPages')

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
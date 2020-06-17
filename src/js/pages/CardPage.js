import { PagesIntarface } from "./PagesInterface";
import { fetchDATA } from "../Fetch/fetchData";
import { MainObject } from "../objectComponent/main/MainObject";
import { Header } from "../components/header/header";
import { Logo } from "../components/logo/Logo";
import { Card } from "../objectComponent/card/Card";
import { Footer } from "../components/footer/Footer";
import { ActiveRouter } from '../routing/ActiveRouter'

export class CardPage extends PagesIntarface {

  constructor(params) {
    super(params)

    this.params = params
  }

  async getRoot() {

    const getDATA = await fetchDATA(`http://jsproject.webcademy.ru/items/${this.params}`, 'CardPage')

    if (getDATA.message) {
      alert(`${ActiveRouter.params} - данного объекта нет в базе` )
      ActiveRouter.setHash = ''
      ActiveRouter.reload
    }

    this.object = new MainObject(
      [Header, Logo, Card, Footer],
      getDATA
    )

    return this.object.getRoot()
  }

  initListener() {
    this.object.init()
  }

  destroyDelete() {
    this.object.destroy()
  }

}
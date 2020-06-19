import { $ } from "../core/Dom"
import { PagesIntarface } from "./PagesInterface"
import { Main } from "../components/main/main"
import { Header } from "../components/header/header"
import { Logo } from "../components/logo/Logo"
import { Birds } from "../BirdsComponent/Birds"
import { Footer } from "../components/footer/Footer"
import { fetchDATA } from "../Fetch/fetchData"


export class BidsPage extends PagesIntarface {

    constructor(params) {
        super(params)

        this.params = params
    }

    async getRoot() {

        const data = await fetchDATA('http://jsproject.webcademy.ru/bids')

        this.birds = new Main(
            [Header, Logo, Birds, Footer],
            data
        )

        return this.birds.getRoot()
    }

    initListener() {
        this.birds.init()
    }

    destroyDelete() {
        this.birds.destroy()
    }
}
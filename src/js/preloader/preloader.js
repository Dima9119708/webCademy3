import { $ } from "../core/Dom"
import { fetchDATA } from "../Fetch/fetchData"

export function preloader() {

  const preloader = $.create('div', 'preloader')
  preloader.innerHTML = `
   <div class="content-wrapper" >
            <!-- top-panel -->
            <div class="top-panel">
                <div class="top-panel__container">
                    <div class="top-panel__title">
                        интернет магазин недвижимости
                    </div>
                    <!-- <div class="top-panel__phone"><a href="tel:+8800557755">8 (800) 55-77-55</a></div> -->

                    <div class="top-panel__favourites">
                        <button class="btn-show-favourites">
                            <i class="fas fa-heart"></i> Избранное
                        </button>
                    </div>
                </div>
            </div>
            <!-- // top-panel -->

            <div class="logo-wrapper">
                <a href="index.html" class="logo">
                    <div class="logo__title">КВАДРАТНЫЙ МЕТР</div>
                    <div class="logo__subtitle">
                        купить квартиру в один клик
                    </div>
                </a>
            </div>

            <div class="container">
                <div class="preloader-holder">
                    <div class="sk-folding-cube">
                        <div class="sk-cube sk-cube-1"></div>
                        <div class="sk-cube sk-cube-2"></div>
                        <div class="sk-cube sk-cube-4"></div>
                        <div class="sk-cube sk-cube-3"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- // content-wrapper -->

        <div class="footer">
            <div class="contaier">
                <p>
                    Учебный проект школы
                    <a href="https://webcademy.ru/">WebCademy</a> с курса
                    <a href="https://webcademy.ru/jscourse/"
                        >JavaScript разработка</a
                    >. Проект выполнил <a href="#">Сергей Васильев</a>.
                </p>
            </div>
        </div>`

  return preloader
}

export function preloaderMINI() {
    const preloader = $.create('div', 'preloader-holder')
    preloader.innerHTML = `
        <div class="sk-folding-cube" data-preloaderMINI>
                        <div class="sk-cube sk-cube-1"></div>
                        <div class="sk-cube sk-cube-2"></div>
                        <div class="sk-cube sk-cube-4"></div>
                        <div class="sk-cube sk-cube-3"></div>
        </div>
    `

    return preloader
}
import { preloaderMINI } from "../preloader/preloader"
import { $ } from "../core/Dom"

export async function fetchDATA(url, fileName) {

  try {
    const getDATA = await fetch(url, {
      method : 'GET',
    })
    const DATA_JSON = await getDATA.json()
    return DATA_JSON

  } catch (e) {
    alert('Проблемы с сервером')
    throw new Error(`
      Не получили данные по адресу ${url},
      Оправка была с файла ${fileName}`)
  }

}

export async function fetchPOST(url, fileName, destroy, modal, send) {
  $(modal).append(preloaderMINI())

  try {

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(send)
    });

    const DATA = await response.json();

    const preloader = $(modal).querySelector('[data-preloaderMINI]')
    preloader.removeElem()

    if (DATA.message === "Bid Created") {
      alert('Ваша заявка успешно отправлена')
      destroy()
    }
    else {
      alert(`Ваша заявка не была отравлена,
       либо некорректные данные,
       либо проблемы на сервере,
       попробуйте позже`
      )

      destroy()
    }

  } catch (e) {
    alert('Проблемы с сервером')
    throw new Error(`
      Не получили данные по адресу ${url},
      Оправка была с файла ${fileName}`)
  }
}
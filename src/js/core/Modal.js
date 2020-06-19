import { $ } from "./Dom"
import { fetchPOST } from "../Fetch/fetchData";
import {
  phoneFormat,
  modalDomTrue,
  modalDomFalse,
  modalFormName,
  modalFormPhone
} from "./modal.fn";

export class Modal {

  open(card) {

    this.modal = $.create('div', 'modal-wrapper')
    setTimeout(() => $(this.modal).addClass('open-modal'), 100)

    this.modal.innerHTML = `
            <div class="modal">
                <div class="modal__header">
                    <div class="modal__title">
                        Заявка на бронирование
                    </div>
                    <div class="modal__details">
                        Квартира <span>${card.flat_number}</span> в Первом квартале Дом 5
                        <div class="modal__details-art">${card.scu}</div>
                    </div>
                </div>

                <form class="modal__form">
                    <div class="modal__form-content">
                        <!-- formgroup -->
                        <div class="formgroup">
                            <label class="modal__form-input-label" for="form-phone">
                                Имя
                            </label>
                            <input type="text" id="form-name" class="modal__form-input" placeholder="Введите имя">
                        </div>
                        <!-- // formgroup -->
                        <!-- formgroup -->
                        <div class="formgroup">
                            <label class="modal__form-input-label" for="form-phone">
                                Телефон
                            </label>
                            <input type="text" id="form-phone" class="modal__form-input" placeholder="+380">
                        </div>
                        <!-- // formgroup -->

                        <div class="formgroup formgroup--checkbox">
                            <input type="checkbox" id="policy">
                            <label class="policy-text" data-policy-text for="policy">Я согласен на обработку моих персональных
                                данных. С Политикой в отношении обработки
                                персональных данных ознакомлен и
                                согласен.</label>
                        </div>
                    </div>
                    <input class="modal__submit" data-submit="submit" type="submit" value="Отправить заявку">
                </form>
                <button class="modal__close" data-close="close">
                    Закрыть
                </button>
            </div>
    `

    return this.modal
  }

  init() {

    const name = $(this.modal).querySelector('#form-name')
    const phone = $(this.modal).querySelector('#form-phone')
    const agreement = $(this.modal).querySelector('[data-policy-text]')

    const send = { name: false, phone: false, agreement: false,}

    this.modal.onclick = e => {

      const close = $(e.target).parent('[data-close]')

      if (close){
        this.destroy()
      }

      if (e.target.id === 'policy') {
        send.agreement = e.target.checked
        agreement.css({ backgroundColor: 'unset'})
      }

      if (e.target.dataset['submit']) {
        e.preventDefault()

        if (send.name && send.phone && send.agreement) {

          modalDomTrue(name, phone, agreement)

          fetchPOST(
            'http://jsproject.webcademy.ru/bidnew',
            'modal',
            this.destroy.bind(this),
            this.modal,
            send
          )
        }
        else {
          modalDomFalse(send, name, phone, agreement)
        }
      }
    }

    this.modal.oninput = e => {

      let { id, value } = e.target

      if (id === 'form-name') {
        value = value.trim()
        modalFormName(e, send, value)

      } else if (id === 'form-phone') {
        e.target.value = phoneFormat(value)
        modalFormPhone(value,send, e)
      }
    }
  }

  destroy() {
    this.modal.onclick = null
    this.modal.oninput = null
    $(this.modal).removeClass('open-modal')
    setTimeout(() => this.modal.remove(),300)
    clearTimeout()
  }
}
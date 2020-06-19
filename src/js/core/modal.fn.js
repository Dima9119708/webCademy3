export function modalDomTrue(name, phone, agreement) {

  name.css({
    border: '2px solid grey'
  })

  phone.css({
    border: '2px solid grey'
  })

  agreement.css({
    backgroundColor: 'unset'
  })
}

export function modalDomFalse(send, name, phone, agreement) {
  if (send.name === false) {
    name.css({
      border: '2px solid red'
    })
  } else if (send.phone === false) {
    phone.css({
      border: '2px solid red'
    })
  } else if (send.agreement === false) {
    agreement.css({
      backgroundColor: 'red'
    })
  }
}

export function modalFormName(e,send, value) {
  if (value.length > 5 && value.length < 15) {
    send.name = value
    e.target.style.border = '2px solid grey'
  } else {
    send.name = null
    e.target.style.border = '2px solid red'
  }
}

export function phoneFormat(input) {
  // Strip all characters from the input except digits
  input = input.replace(/\D/g, '');

  // Trim the remaining input to ten characters, to preserve phone number format
  input = input.substring(0, 10);

  // Based upon the length of the string, we add formatting as necessary
  var size = input.length;
  if (size == 0) {
    input = input;
  } else if (size < 4) {
    input = '(' + input;
  } else if (size < 7) {
    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
  } else {
    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + ' - ' + input.substring(6, 10);
  }
  return input;
}

export function modalFormPhone(value, send, e) {
  if (phoneFormat(value)) {
    send.phone = value
    e.target.style.border = '2px solid grey'
  } else {
    send.phone = null
    e.target.style.border = '2px solid red'
  }
}
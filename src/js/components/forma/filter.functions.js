const squareIF = (obj, params ) => {
  return +obj.floor >= params.sqmin && +obj.floor <= params.sqmax
}

const totalPriceIF = (obj, params) => {
  return +obj.price_total >= params.pricemin && +obj.price_total <= params.pricemax
}

const complexIF = (obj, params) => {
  return obj.complex_name === params.complex
}

export function changeParams(params, value, name) {
  const defaultParm = { ...params, [name]: value }
  return defaultParm
}

export function filter(params, DATA) {

  let DATA_COMPLEX = []
  let DATA_ROOMS = []

  DATA.forEach(obj => {

    if (params.complex === 'all') {
      if (squareIF(obj, params)) {
        if (totalPriceIF(obj, params)) {
          DATA_COMPLEX.push(obj)
        }
      }
    }

    if (complexIF(obj, params)) {
      if (squareIF(obj, params)) {
        if (totalPriceIF(obj, params)){
          DATA_COMPLEX.push(obj)
        }
      }
    }
  })

  if (params.rooms.length > 0) {

    params.rooms.forEach(value => {

      DATA_COMPLEX.forEach(obj => {

        if (+obj.rooms === value) {
          DATA_ROOMS.push(obj)
        }
      })
    })

    return DATA_ROOMS
  }
  else {
    return DATA_COMPLEX
  }
}

export function filterCheckbox(target, groupCheckbox) {
  if (target.checked) {
    groupCheckbox.push(+target.value)
  }
  else {
    const valueDelete =
        groupCheckbox.findIndex(elem => elem === target.value)

    groupCheckbox.splice(valueDelete, 1)
  }

  return groupCheckbox
}

export function filterINPUT(
  event,
  DOM_min,
  DOM_max,
  params,
  fieldMin,
  fieldMax,
  minStr,
  maxStr,
  ) {

  let min
  let max

  if (event.target.name === `${minStr}`) {

    min = +event.target.value

    if (minStr === 'pricemin') {
      if (+event.target.value > fieldMax) {
        event.target.value = event.target.value.slice(0, 7)
      }
    }
    else if (minStr === 'sqmin') {
      if (+event.target.value > fieldMax) {
        event.target.value = event.target.value.slice(0, 1)
      }
    }

  } else {

    max = +event.target.value

    if (maxStr === 'pricemax') {
      if (+event.target.value > fieldMax) {
        event.target.value = event.target.value.slice(0, 7)
      }
    }
    else if (maxStr === 'sqmax') {
      if (+event.target.value > fieldMax) {
        event.target.value = event.target.value.slice(0, 3)
      }
    }
  }

  min = min ? min :
    +DOM_min.value || fieldMin

  max = max ? max :
    +DOM_max.value || fieldMax

  if (min > max || min < fieldMin || max > fieldMax) {
    return params
  } else {

    params = changeParams(params, min, `${minStr}`)
    params = changeParams(params, max, `${maxStr}`)

    return params
  }

}
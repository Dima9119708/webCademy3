class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
                ? document.querySelector(selector)
                : selector
  }

  html(html) {
    if (html) {
      this.$el.innerHTML = html
      return this
    }

    return this.$el.innerHTML
  }

  append(node) {
    this.$el.append(node)
    return this
  }

  removeElem() {
    this.$el.remove()
    return this
  }

  insertHTML(position, text) {
    this.$el.insertAdjacentHTML(position, text)
  }

  on(event, fn){
    this.$el.addEventListener(event, fn)
  }

  off(event, fn) {
    this.$el.removeEventListener(event, fn)
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  clear() {
    this.$el.innerHTML = ''
    return this
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key]
    })
  }

  parent(node) {
    return this.$el.closest(node)
  }

  querySelector(selector) {
    return $(this.$el.querySelector(selector))
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
    }

    return this.$el.dataset[name]
  }
}

export function $(element) {
  return new Dom(element)
}

$.create = (tagName, className) => {
  const createElem = document.createElement(tagName)

  if (className) {
    const classNames = className.split(' ')
    createElem.classList.add(classNames[0])
    createElem.classList.add(classNames[1] ? classNames[1] : '/')
  }

  return createElem
}
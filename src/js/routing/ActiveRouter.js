export class ActiveRouter {

  static get hash() {
    return location.hash.slice(1)
  }

  static set setHash(str) {
    location.hash = str
  }

  static get params() {
    return ActiveRouter.hash.split('/')[1]
  }

  static get reload() {
    location.reload()
  }
}
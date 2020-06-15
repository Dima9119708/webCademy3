export class ActiveRouter {

  static get hash() {
    return location.hash.slice(1)
  }

}
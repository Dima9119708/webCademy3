export class Emitter {
  constructor () {
    this.listener = {}
  }

  emit(name, ...args) {
    this.listener[name].forEach(listener => {
      listener(...args)
    });
  }

  subscribe(name, fn) {
    this.listener[name] = []
    this.listener[name].push(fn)
  }
}
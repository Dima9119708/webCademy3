import { reducer } from "./reducer"
import { storage } from "../storage/localStorage"

export class Store {

  constructor(reducer, initialState = {}) {
    this.reducer = reducer
    this.store = this.reducer({ ...initialState }, { type: '__INIT__' },)
    this.listener = []
  }

  dispatch(action) {
    this.store = this.reducer(this.store, action)
    this.listener.forEach(listener => listener(this.store))
  }

  subscribeStore(fn) {
    this.listener.push(fn)
  }

  getState() {
    return storage('DATA')
  }
}
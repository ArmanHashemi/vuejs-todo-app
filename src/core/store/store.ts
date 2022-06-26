import _Vue from 'vue'
import { injectable } from 'inversify'
import Vuex, { Store as _Store } from 'vuex'
import { IStore } from './store.types'
export const STORE_TYPE = Symbol('Store')

@injectable()
export class Store implements IStore {
  store: _Store<any>;

  constructor () {
    _Vue.use(Vuex)
  }

  makeStore (modules: any): void {
    this.store = new Vuex.Store<any>({
      modules
    })
  }

  install (Vue: typeof _Vue): void {
    Vue.prototype.$store = this.store
  }
}

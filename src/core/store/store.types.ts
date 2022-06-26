import _Vue from 'vue'
import { Store } from 'vuex'

export interface IStore {
  store: Store<any>;
  makeStore(modules: any): void;
  install(Vue: typeof _Vue): void;
}

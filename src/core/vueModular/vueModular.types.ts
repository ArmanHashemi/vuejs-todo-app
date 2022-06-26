import VueRouter, { RouteConfig } from 'vue-router'
import { Store } from 'vuex'

export type IModule = {
  store?: Store<any>;
  router?: {
    routes: RouteConfig[];
  } & {
    [key: string]: Function;
  };
} & { [key: string]: object };

export interface IVueModularOptions {
  store?: Store<any>;
  router?: VueRouter;
  vmProperty?: string;
  modules: { [key: string]: IModule };
}

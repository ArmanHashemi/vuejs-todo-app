import _Vue from 'vue'
import { Store } from 'vuex'
import VueRouter from 'vue-router'

import { IModule, IVueModularOptions } from './vueModular.types'
import container from '../di/container'
import { STORE_TYPE, IStore } from '@/core/store'

const defaultOptions = { vmProperty: '$modules' }
let modules = {}
let store: Store<any> | null = null
let router: VueRouter | null = null

/**
 * Install the plugin with Vue.use(VueModular, options)
 * @param {Object} Vue
 * @param {Object} [options]
 * @param {Object} [options.modules] - an object containing modules you want to register
 * @param {Object} [options.store] - a Vuex store instance
 * @param {Object} [options.router] - a Vue Router instance
 */

export default {
  install (Vue: typeof _Vue, options: IVueModularOptions) {
    options = Object.assign({}, defaultOptions, options)
    if (options.store) store = options.store
    if (options.router) router = options.router
    if (isModuleShape(options.modules)) registerModules(Vue, options.modules)
  }
}

/**
 * Helper to assure that shape of object is module definition(s)
 * @param {Object} mod
 */
const isModuleShape = (mod?: Record<string, any>) =>
  !!mod && typeof mod === 'object' && Object.keys(mod).length > 0

/**
 * Register one or more modules
 * @param {Object} Vue
 * @param {Object} mods
 */
export function registerModules (
  Vue: typeof _Vue,
  mods: { [key: string]: IModule }
) {
  modules = Object.assign(modules, mods)
  const storeModules: { [x: string]: Store<any> | undefined } = {}
  Object.keys(mods).forEach((modKey) => {
    const modDefinition = mods[modKey]
    if (store) registerModuleStore(modKey, modDefinition, store)
    else if (modDefinition.store) {
      storeModules[modKey] = modDefinition.store
    }
    if (router) registerModuleRouter(modDefinition, router)
  })
  if (Object.keys(storeModules).length > 0) {
    createStore(Vue, storeModules)
  }
}

/**
 * Return all registered modules
 * @returns {object} modules
 */
export function getModules () {
  return modules
}

/**
 * Resets all values (helpful for testing)
 */
export function reset () {
  modules = {}
  store = null
  router = null
}

/**
 * Extract and register a module store
 * @param {string} key
 * @param {Object} mod
 * @param {Object} store
 */
export function registerModuleStore (
  key: string,
  mod: { [key: string]: object },
  store: Store<any>
) {
  if ('store' in mod === false) return false
  store.registerModule(key, mod.store)
}

/**
 * Extract and register a module store
 * @param {Object} Vue
 * @param {Object} mods
 */
export function createStore (
  Vue: typeof _Vue,
  mods: { [key: string]: Store<any> | undefined }
): void {
  try {
    const store = container.get<IStore>(STORE_TYPE)
    store.makeStore(mods)
    store.install(Vue)
    // store = makeStore({ modules: mods });
    // Vue.prototype.$store = store;
  } catch (error) {
    console.log('err', error)
  }
}

/**
 * Extract and register a module router
 * @param {Object} mod
 * @param {Object} router
 */
export function registerModuleRouter (mod: IModule, router: VueRouter) {
  if (!mod.router) return false
  const { routes: moduleRoutes, ...moduleMethods } = mod.router
  if (moduleRoutes) {
    router.addRoutes(moduleRoutes)
  }
  if (moduleMethods && Object.keys(moduleMethods).length > 0) {
    Object.keys(moduleMethods).forEach((moduleMethod) => {
      const methodName = moduleMethods[moduleMethod].name || moduleMethod
      // @ts-ignore
      if (typeof router[methodName] !== 'function') return
      // @ts-ignore
      router[methodName].call(router, moduleMethods[moduleMethod])
    })
  }
}

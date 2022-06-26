import { ContainerModule } from 'inversify'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import router, { ROUTER_TYPE } from '@/router/router'
import { HttpClient, HTTP_CLIENT_TYPE, IHttpClient } from '../httpClient'
import { IStore, Store, STORE_TYPE } from '@/core/store'

import container from './container'
import i18n, { I18N_TYPE } from '../localization'

export const APP_TYPE = Symbol('@/app/vue')

import {HOME_SERVICE_TYPE,IHomeService,HomeService} from '@/home/services'

const thirdPartyDependencies = new ContainerModule((bind) => {
  bind<VueRouter>(ROUTER_TYPE).toConstantValue(router)
  bind<VueI18n>(I18N_TYPE).toConstantValue(i18n)
})

const coreDependencies = new ContainerModule((bind) => {
  bind<IStore>(STORE_TYPE)
    .to(Store)
    .inSingletonScope()

  bind<IHttpClient>(HTTP_CLIENT_TYPE)
    .to(HttpClient)
    .inSingletonScope()
})
const homeDependencies = new ContainerModule((bind) => {
  bind<IHomeService>(HOME_SERVICE_TYPE).to(HomeService)
});


container.load(
  thirdPartyDependencies,
  coreDependencies,
  homeDependencies
)

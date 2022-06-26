import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './messages'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'fa', // set locale fa or en
  messages
})

export const I18N_TYPE = Symbol('I18N_TYPE')
export default i18n

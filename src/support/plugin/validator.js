// import { defaultForm } from '../utils'

import prototypes from '../../prototypes'

export default {
  install (Vue, { defaultFormName }) {
    Vue.prototype.$init = prototypes.init

    Vue.prototype.$validate = prototypes.validate 

    Vue.prototype.$touch = prototypes.touch

    // Vue.prototype.$allTouched = prototypes.allTouched

    // Vue.prototype.$isValidForm = prototypes.isValidForm

    // Vue.prototype.$resetForm = prototypes.resetForm
  }
}

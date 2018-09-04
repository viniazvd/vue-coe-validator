import Vue from 'vue'
import Root from './Root.vue'

import validator from './support/plugin/validator'

Vue.use(validator, {
  defaultFormName: 'form1'
})

// validator.registerCustomEvent('validator', {})

Vue.config.productionTip = false

new Vue({ render: h => h(Root) }).$mount('#app')

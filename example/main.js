import Vue from 'vue'
import Root from './Root.vue'

import { validator } from 'vue-coe-validator'

Vue.use(validator)

Vue.config.productionTip = false

new Vue({ render: h => h(Root) }).$mount('#app')

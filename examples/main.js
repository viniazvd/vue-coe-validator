import Vue from 'vue'
import App from './App.vue'
import { validator } from 'vue-coe-validator'

Vue.use(validator)

Vue.config.productionTip = false

new Vue({ render: h => h(App) }).$mount('#app')
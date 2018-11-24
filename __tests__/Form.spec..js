import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { validator } from '../src/index.js'

Vue.use(validator)

import Form from './components/Form.vue'

test('is a Vue instance', () => {
  const wrapper = shallowMount(Form)

  expect (wrapper.isVueInstance()).toBeTruthy()
})
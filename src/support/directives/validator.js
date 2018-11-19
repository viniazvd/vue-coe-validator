import { addTouchListener } from '../services'

export default {
  validator: {
    bind (el, binding, vnode) {
      const vm = vnode.context
      const [ form ] = vnode.data.model.expression.split('.')

      // if the form property does not exist in validations, set.
      if (!vm.validations[form]) {
        vm.$set.call(vnode, vm.validations, form, {})
      }
    },

    inserted (el, { value: rules }, vnode) {
      const vm = vnode.context
      const [ form, key ] = vnode.data.model.expression.split('.')
      const value = vnode.data.model.value

      const inputElement = el.querySelector('input')

      // add validation states/rules
      vm.$validator.add(form, key, value, rules)

      // extra and optional flag to handle addTouchListener
      const addByDirective = true

      // set validate onBlur
      vm.$validator.validateOnBlur && addTouchListener.call(vm, form, inputElement, addByDirective)
    }
  }
}

import { addTouchListener } from '../services'
import { getFormValues } from '../services/directive'

export default {
  validator: {
    bind (el, binding, vnode) {
      const vm = vnode.context

      const { form } = getFormValues(vnode)

      // if the form property does not exist in validations, set.
      if (!vm.validations[form]) {
        vm.$set.call(vnode, vm.validations, form, {})
      }
    },

    inserted (el, { value: rules }, vnode) {
      const vm = vnode.context

      const { form, key, value, inputElement } = getFormValues(vnode, el)

      // add validation states/rules
      vm.$validator.add(form, key, value, rules)

      // set validate onBlur
      vm.$validator.validateOnBlur && addTouchListener.call(vm, form, inputElement)
    }
  }
}

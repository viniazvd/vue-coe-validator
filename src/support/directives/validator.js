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
      const [ form, key ] = vnode.data.model.expression.split('.')

      const validations = { [key]: rules }

      vnode.context.$validator.add(validations, form)
    }
  }
}

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
      const data = vm[form]

      const validations = {
        ...vm.validations,
        [form]: {
          ...vm.validations[form],
          [key]: {
            ...vm.validations[form][key],
            ...rules
          }
        }
      }

      vm.validations = vm.$validator.init(data, null, validations)
    }
  }
}

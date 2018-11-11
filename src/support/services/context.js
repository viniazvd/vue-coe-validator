export function getContext () {
  const vm = this.$validator || this
  const componentID = Object.keys(vm.context.components)[Object.keys(vm.context.components).length - 1]

  return vm.context.components[componentID]
}

export function setContext () {
  this.$validator.context.components = {
    ...this.$validator.context.components,
    [this._uid]: this
  }
}

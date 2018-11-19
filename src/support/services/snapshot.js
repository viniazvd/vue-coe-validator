import { getData } from './'

export function getSnapshots () {
  const validation = this.$options.validation

  const data = getData.call(this)

  return Object.entries(data).reduce((acc, [dataKey, dataValue]) => {
    Object
      .keys(validation)
      .forEach(validationKey => (validationKey === dataKey) && (acc[dataKey] = dataValue))

    return acc
  }, {})
}

export function setSnapshot () {
  this.$validator.snapshots.components = {
    ...this.$validator.snapshots.components,
    [this._uid]: getSnapshots.call(this)
  }
}

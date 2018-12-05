import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import { validator, formSetup } from '../src/index.js'
import Form from './components/Form.vue'

const localVue = createLocalVue()

localVue.use(validator, { validateOnBlur: true })

describe('TESTS', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Form, { localVue, mixins: [formSetup] })
  })

  test('is a Vue instance?', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('default value without input value', () => {
    const {
      isTouched,
      isChanged,
      isLoading,
      isDirty,
      isFilled,
      isValid,
      errors
    } = wrapper.vm.validations.form1.email

    expect(isTouched).toBe(false)
    expect(isDirty).toBe(false)
    expect(isChanged).toBe(false)
    expect(isLoading).toBe(false)
    expect(isFilled).toBe(false)
    expect(isValid).toBe(false)
    expect(errors).toEqual([])
  })

  test('default value with input value', () => {
    const {
      isTouched,
      isChanged,
      isLoading,
      isDirty,
      isFilled,
      isValid,
      errors
    } = wrapper.vm.validations.form1.name

    expect(isTouched).toBe(false)
    expect(isDirty).toBe(true)
    expect(isChanged).toBe(false)
    expect(isLoading).toBe(false)
    expect(isFilled).toBe(true)
    expect(isValid).toBe(false)
    expect(errors).toEqual([])
  })

  test('trigger a input', () => {
    wrapper.setData({ form1: { name: '123456' } })

    expect(wrapper.vm.form1.name).toEqual('123456')

    expect(wrapper.vm.validations.form1.name).toEqual({
      errors: ['Must be a alphabetic value'],
      isTouched: true,
      isChanged: true,
      isLoading: false,
      isDirty: true,
      isFilled: true,
      isValid: false,
      required: true,
      alphabetic: true
    })
  })

  // test('validateOnBlur', () => {
  //   const input = wrapper.find('input[name="name"]')

  //   input.trigger('keydown', { which: 9 })
  //   input.trigger('keydown.tab')
  //   input.trigger('click')
  //   input.trigger('blur')
  //   input.trigger('focusout')

  //   wrapper.vm.$nextTick(() => {
  //     expect(wrapper.vm.validations.form1.name).toEqual({
  //       errors: ['Field is required'],
  //       isTouched: true,
  //       isDirty: true,
  //       isFilled: false,
  //       isValid: false,
  //       alphabetic: true
  //     })
  //   })
  // })
})
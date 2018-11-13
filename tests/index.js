import test from 'ava'

import { resetForm } from '../src/support/services/reset'

test.skip('resetForm', t => {
  const fieldReseted = {
    name: {
      errors: [],
      isDirty: false,
      isFilled: false,
      isTouched: false,
      isValid: false,
    }
  }

  const field = {
    name: {
      errors: ['error'],
      isDirty: true,
      isFilled: true,
      isTouched: true,
      isValid: true,
    }
  }

	t.is(fieldReseted, resetForm(field))
})

test('bar', async t => {
  const bar = Promise.resolve('bar')

	t.is(await bar, 'bar')
})
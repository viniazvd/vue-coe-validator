require("@babel/register")
import test from 'ava'

import resetForm from '../src/support/services/reset.js'

test('foo', t => {
  console.log(resetForm)
	t.pass()
})

test('bar', async t => {
  const bar = Promise.resolve('bar')

	t.is(await bar, 'bar')
})
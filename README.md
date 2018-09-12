<h1 align="center">vue-coe-validator ✅</h1>

<p align="center">
  <q>Another validation form for the Vue. Validates input fields of multiple forms and displays errors. Note: without any dependencies.</q>
</p>

<p align="center">
  <a href="https://github.com/cj/vuelidation/blob/master/LICENSE.md"><img src="https://img.shields.io/npm/l/vuelidation.svg" alt="License" target="_blank"></a>
</p>

<p align="center">
  ✨ <a href="https://codesandbox.io/s/github/viniazvd/vue-coe-validator-example">Example</a>✨
</p>

**Install**

`yarn add --dev vue-coe-validator@latest`

**Include Plugin**
```javascript
import Vue from 'vue'
import Root from './Root.vue'

import { validator } from 'vue-coe-validator'

Vue.use(validator)
```

**Include Mixin**
```javascript
import { formSetup } from 'vue-coe-validator'

mixins: [ formSetup ]
```

**Use**
```vue
<template>
  <div id="app">
    <section>
      <h3>form1</h3>
      <form name="form1">
        <c-input
          name="input1"
          :validation="$hasError('input1', 'form1')"
          v-model="form1.input1"
        />

        <c-input
          name="input2"
          label="input2"
          :validation="$hasError('input2', 'form1')"
          v-model="form1.input2"
        />
      </form>
    </section>

    <section>
      <h3>form2</h3>
      <form name="form2">
        <c-input
          name="input1"
          :validation="$hasError('input1', 'form2')"
          v-model="form2.input1"
        />
      </form>
    </section>
  </div>
</template>

<script>
import { formSetup } from 'vue-coe-validator'

export default {
  mixins: [ formSetup ],

  data () {
    return {
      form1: { input1: '', input2: '22' },
      form2: { input1: '33' }
    }
  },

  validation: {
    form1: {
      input1: {
        required: true,
        alphabetic: true
      },
      input2: {
        required: true,
        pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
      }
    },
    form2: {
      input1: {
        required: true,
        alpha: true
      }
    }
  },

  messages: {
    form1: {
      input1: {
        required: 'não pode ser vazio!',
        alphabetic: 'tá errado, é alphabetic!'
      },
      input2: {
        required: 'preenche tudo!',
        pattern: 'precisa ser e-mail!'
      }
    },
    form2: {
      input1: {
        required: 'tá vazio, não pode!',
        alpha: 'tá errado, é alpha!'
      }
    }
  }
}
</script>
```

## Rules

Name       | required | About
-----      | -------  | -----
form       | `true`   | must be named
input      | `true`   | must be named
$hasError  | `false`  | params: (inputName(String) -`required`, formName(String) -`required only with multiple forms`)
messages   | `false`  | `has default messages`

## Validations

<details>
<summary>
  <a href='https://github.com/viniazvd/vue-coe-validator/blob/master/src/rules/alphabetic.js'><b>alphabetic</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li>Must be a alphabetic value</li>
      <li><b>args:</b> Boolean</li>
    </ul>
  </p>
</summary>

```javascript
{
  alphabetic: true,
}
```
</details>

<details>
<summary>
  <a href='https://github.com/viniazvd/vue-coe-validator/blob/master/src/rules/alpha.js'><b>alpha</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li>Must only contain letters and numbers</li>
      <li><b>args:</b> Boolean</li>
    </ul>
  </p>
</summary>

```javascript
{
  alpha: true,
}
```
</details>

<details>
<summary>
  <a href='https://github.com/viniazvd/vue-coe-validator/blob/master/src/rules/pattern.js'><b>pattern</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>msg:</b> Must be a numeric string</li>
      <li><b>arg:</b> String</li>
    </ul>
  </p>
</summary>

```javascript
{
  numeric: true,
}
```
</details>



<details>
<summary>
  <a href='https://github.com/viniazvd/vue-coe-validator/blob/master/src/rules/numeric.js'><b>numeric</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>msg:</b> Must be a numeric value</li>
      <li><b>arg:</b> Boolean</li>
    </ul>
  </p>
</summary>

```javascript
{
  numeric: true,
}
```
</details>

<details>
<summary>
  <a href='https://github.com/viniazvd/vue-coe-validator/blob/master/src/rules/required.js'><b>required</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>msg:</b> Required</li>
      <li><b>arg:</b> Boolean</li>
    </ul>
  </p>
</summary>

```javascript
{
  required: true,
}
```
</details>

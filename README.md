<h1 align="center">vue-coe-validator ✅</h1>

<p align="center">
  <q>Another validation form for the Vue. Validates input fields of multiple forms and displays errors. Note: without any dependencies.</q>
</p>

<p align="center">
  <a href="https://github.com/VitorLuizC/vue-data-tablee"><img src="https://img.shields.io/npm/l/vuelidation.svg" alt="License" target="_blank"></a>
</p>

<p align="center">
  ✨ <a href="https://codesandbox.io/s/github/viniazvd/vue-coe-validator-example">Example</a>✨
</p>

**Install**

`yarn add vue-coe-validator`

**Include Plugin**
```javascript
import Vue from 'vue'

import { validator } from 'vue-coe-validator'

Vue.use(validator)
```

**Include Mixin (required only on components that need validation)**
```javascript
import { formSetup } from 'vue-coe-validator'

mixins: [ formSetup ]
```

**How to use**
```vue
<template>
  <div id="app">
    <section>
      <h3>form1</h3>
      <form name="form1">
        <c-input
          name="input1"
          :validation="$hasError('input1')"
          v-model="form1.input1"
        />

        <c-input
          name="input2"
          :validation="$hasError('input2')"
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

**You can also define validations with directives**
```vue
<c-input
  name="name"
  :validation="$hasError('name')"
  v-validator="{ required: true }"
  v-model="form1.name"
/>
```

**Or use the setValidations function by passing the validation object and form name**
```js
methods: {
  addField () {
    // add new field
    this.form1 = {
      ...this.form1,
      coe: 'mané'
    }

    // create validation for new field
    const validations = {
      coe: { required: true }
    }

    // set validation for new field
    this.$validator.init(validations, 'form1')
  }
}
```

## Rules

Name              | required | About
-----             | -------  | -----
form              | `true`   | set an name for the scope of the form
input             | `true`   | name the input with the tag name and its respective form value


## Mixin methods

Name           | About
-----------    | ----------
$hasError      | params: (inputName(String) -`required`, formName(String) -`required only with multiple forms`)
$isValidForm   | i'm lazy and you already know what this does


## Validator methods

Name           | About
-----------    | ----------
init           | wip
reset          | params: (formName(String) - `optional`. Obs: no parameter resets inputs of all forms
validate       | sorry, i'm lazy
validateAll    | sorry, i'm lazy


## Customize validation messages globally
```javascript
import validator from './support/plugin/validator'

Vue.use(validator, {
  messages: {
    required: 'must be filled',
    alpha: 'must be alpha'
  }
})
```

## Set validate on blur
```javascript
import validator from './support/plugin/validator'

Vue.use(validator, { 
  validateOnBlur: true // default is false 
})
```

## Validations

<details>
<summary>
  <a href='https://github.com/viniazvd/vue-coe-validator/blob/master/src/rules/alphabetic.js'><b>alphabetic</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>default message:</b> Must be a alphabetic value</li>
      <li><i>type:</i> Boolean</li>
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
      <li><b>default message:</b> Must only contain letters and numbers</li>
      <li><i>type:</i> Boolean</li>
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
      <li><b>default message:</b> Invalid, try again</li>
      <li><i>type:</i> String</li>
    </ul>
  </p>
</summary>

```javascript
{
  pattern: true,
}
```
</details>



<details>
<summary>
  <a href='https://github.com/viniazvd/vue-coe-validator/blob/master/src/rules/numeric.js'><b>numeric</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>default message:</b> Must be a numeric value</li>
      <li><i>type:</i> Boolean</li>
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
      <li><b>default message:</b> Field is required</li>
      <li><i>type:</i> Boolean</li>
    </ul>
  </p>
</summary>

```javascript
{
  required: true,
}
```
</details>

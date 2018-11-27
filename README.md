<h1 align="center">vue-coe-validator ✅</h1>

<p align="center">
  <p align="center">Another validation form for the Vue. Validates input fields of multiple forms and displays errors.</p>
  <p align="center">Note: without any dependencies.</p>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/npm/l/vuelidation.svg" alt="License" target="_blank"></a>
</p>

<p align="center">
  ✨ <a href="https://codesandbox.io/s/github/viniazvd/vue-coe-validator-example">Example (WIP)</a>✨
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

**Pay attention:**
```
Be careful not to create a state with the name: validations and messages.

These names are reserved for the library and overwriting them may compromise their behavior.
```
<p align="center">
  <a href="https://github.com/viniazvd/vue-coe-validator/issues/10">take a look at the issue</a>
</p>


**How to use**
```vue
<template>
  <section>
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

      <c-input
        name="input3"
        :validation="$hasError('input3')"
        v-model="form1.input3"
      />
    </form>

    <form name="form2">
      <c-input
        name="input1"
        :validation="$hasError('input1', 'form2')"
        v-model="form2.input1"
      />
    </form>
  </section>
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
        pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i,
        customAsync: [
          value => new Promise(resolve => setTimeout(() => {
            resolve(value === 'viniazvd@gmail.com')
          }, 2000)),
          value => new Promise(resolve => setTimeout(() => {
            resolve(typeof value === 'string')
          }, 3000))
        ]
      },
      input3: {
        required: true,
        custom: [
          (value) => value === '123',
          (value) => typeof value === 'string'
        ]
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
        required: 'tá vazio, não pode!'
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
    this.$validator.add(validations, 'form1')
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


## Validator methods

Name           | Params                   | About
:--------------|:------------------------:|:--------------------
add            | `(validations, formName)` | set validation for new field
touch          |  `(inputName, formName)`  | touches a field (isTouched = true) 
resetField     |        `(formName)`       | resets a field
resetForm      |        `(formName)`       | resets a form
validateField  |        `(formName)`       | touches a field and checks if it is valid
validateForm   |        `(formName)`       | touch the form fields and check if it is valid
isFormValid    |        `(formName)`       | promise that returns a boolean

<p style='color:red'>validations:</p>
-type Object

<p style='color:red'>inputName:</p>
-type String

<p style='color:red'>formName:</p> 
-type String 
-required only when you have more than one form


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
    alphabetic: true
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
    alpha: true
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
    pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i  
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
    numeric: true
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
    required: true
  }
  ```
</details>

<details>
  <summary>
    <a href='https://github.com/viniazvd/vue-coe-validator/blob/master/src/rules/custom.js'><b>custom</b></a>
    <p style='margin: 0; '>
      <ul style='margin: 0; padding: 0; list-style-type: none;'>
        <li><b>default message:</b> Campo inválido</li>
        <li><i>type:</i> Array</li>
      </ul>
    </p>
  </summary>

  ```javascript
  {
    custom: [
      (value) => value === '123',
      (value) => typeof value === 'string'
    ]
  }
  ```
</details>

<details>
  <summary>
    <a href='https://github.com/viniazvd/vue-coe-validator/blob/master/src/rules/customAsync.js'><b>customAsync</b></a>
    <p style='margin: 0; '>
      <ul style='margin: 0; padding: 0; list-style-type: none;'>
        <li><b>default message:</b> Campo inválido</li>
        <li><i>type:</i> Array</li>
      </ul>
    </p>
  </summary>

  ```javascript
  {
    customAsync: [
      value => new Promise(resolve => setTimeout(() => {
        resolve(value === 'viniazvd@gmail.com')
      }, 2000)),
      value => new Promise(resolve => setTimeout(() => {
        resolve(typeof value === 'string')
      }, 3000))
    ]
  }
  ```
</details>


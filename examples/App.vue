<template>
  <div id="app">
    <!-- <example1 /> -->
    <example2 />
  </div>
</template>

<script>
import Example1 from './Example1.vue'
import Example2 from './Example2.vue'

export default {
  name: 'example',

  components: { Example1, Example2 }
}
</script>
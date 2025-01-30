<template>
  <base-scroll-area class="lt-sm:pb-16 pb-5" style="height: calc(100vh - 200px)">
    <slot name="default" />
  </base-scroll-area>
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

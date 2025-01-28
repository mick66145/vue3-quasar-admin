<template>
  <base-scroll-area style="height: calc(100vh - 150px)">
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

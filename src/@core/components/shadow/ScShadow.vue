<template>
  <div
    class="cursor-pointer"
    :class="{'sc-shadow-primary text-primary': active, 'text-grey-8': !active}"
    @mouseover="onSelect()"
    @mouseleave="onClear()"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
export default defineComponent({
  props: {},
  setup () {
    const active = ref(false)
    const onSelect = () => {
      active.value = true
    }
    const onClear = () => {
      active.value = false
    }
    return {
      active,
      onSelect,
      onClear,
    }
  },
})
</script>

<style lang="postcss" scoped>
.sc-shadow-primary {
  /* @apply shadow-primary-500 */

  border-radius: 10px;
  box-shadow: 0 0 6px 0;
}
</style>

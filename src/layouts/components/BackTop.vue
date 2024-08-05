<template>
  <q-page-scroller
    :position="position"
    :scroll-offset="scrollOffset"
  >
    <base-button fab icon="keyboard_arrow_up" />
  </q-page-scroller>
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
    position: { type: String, default: 'right' },
    scrollOffset: { type: [String, Number], default: 150 },
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-page-scroller {
  &:deep(.q-page-sticky) {
    @apply z-[100];
  }
}
</style>

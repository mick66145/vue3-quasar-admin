<template>
  <component :is="currentLayout" />
</template>

<script>
import Theme1EntryLayout from './components/theme/Theme1EntryLayout.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  name: 'MainLayout',
  components: {
    Theme1EntryLayout,
  },
  setup () {
    // ref
    const currentLayout = ref('Theme1EntryLayout')

    // methods
    const setLayout = (layout) => {
      currentLayout.value = layout
    }
    return {
      currentLayout,
      setLayout,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

<template>
  <component :is="currentLayout" />
</template>

<script>
import Theme1MainLayout from './components/theme/Theme1MainLayout.vue'
import Theme2MainLayout from './components/theme/Theme2MainLayout.vue'
import Theme3MainLayout from './components/theme/Theme3MainLayout.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  name: 'MainLayout',
  components: {
    Theme1MainLayout,
    Theme2MainLayout,
    Theme3MainLayout,
  },
  setup () {
    // ref
    const currentLayout = ref('Theme1MainLayout')

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

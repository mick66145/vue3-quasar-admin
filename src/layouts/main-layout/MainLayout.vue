<template>
  <div>
    <component :is="currentLayout" />
  </div>
</template>

<script>
import Theme1MainLayout from './components/theme/Theme1MainLayout.vue'
import Theme2MainLayout from './components/theme/Theme2MainLayout.vue'
import Theme3MainLayout from './components/theme/Theme3MainLayout.vue'
import { defineComponent, computed } from 'vue-demi'
import { useApp } from '@/stores/app'

export default defineComponent({
  name: 'MainLayout',
  components: {
    Theme1MainLayout,
    Theme2MainLayout,
    Theme3MainLayout,
  },
  setup () {
    // ref
    const storeApp = useApp()

    // computed
    const currentLayout = computed(() => {
      return storeApp.layout.mainLayoutTheme
    })

    return {
      currentLayout,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

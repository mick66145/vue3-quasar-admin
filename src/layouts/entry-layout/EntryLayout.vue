<template>
  <div>
    <component :is="currentLayout" />
  </div>
</template>

<script>
import Theme1EntryLayout from './components/theme/Theme1EntryLayout.vue'
import { defineComponent, computed } from 'vue-demi'
import { useApp } from '@/stores/app'

export default defineComponent({
  name: 'MainLayout',
  components: {
    Theme1EntryLayout,
  },
  setup () {
    // ref
    const storeApp = useApp()

    // computed
    const currentLayout = computed(() => {
      return storeApp.layout.entryLayoutTheme
    })

    return {
      currentLayout,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

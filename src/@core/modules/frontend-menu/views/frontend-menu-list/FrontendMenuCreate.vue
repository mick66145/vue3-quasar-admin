<template>
  <frontend-menu-detail mode="create" />
</template>

<script>
import { defineComponent } from 'vue-demi'
import FrontendMenuDetail from './components/frontend-menu-detail/FrontendMenuDetail.vue'

export default defineComponent({
  components: {
    FrontendMenuDetail,
  },
})
</script>

<style lang="postcss" scoped>
</style>

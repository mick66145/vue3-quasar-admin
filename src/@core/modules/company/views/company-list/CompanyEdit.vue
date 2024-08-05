<template>
  <company-detail mode="edit" />
</template>

<script>
import { defineComponent } from 'vue-demi'
import CompanyDetail from './components/CompanyDetail.vue'

export default defineComponent({
  components: {
    CompanyDetail,
  },
})
</script>

<style lang="postcss" scoped>
</style>

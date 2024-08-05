<template>
  <user-detail mode="edit" />
</template>

<script>
import { defineComponent } from 'vue-demi'
import UserDetail from './components/UserDetail.vue'

export default defineComponent({
  components: {
    UserDetail,
  },
})
</script>

<style lang="postcss" scoped>
</style>

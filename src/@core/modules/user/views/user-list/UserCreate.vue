<template>
  <user-detail mode="create" />
</template>

<script>
import UserDetail from './components/user-detail/UserDetail.vue'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  components: {
    UserDetail,
  },
})
</script>

<style lang="postcss" scoped>
</style>

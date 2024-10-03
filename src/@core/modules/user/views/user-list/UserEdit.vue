<template>
  <user-detail mode="edit" />
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

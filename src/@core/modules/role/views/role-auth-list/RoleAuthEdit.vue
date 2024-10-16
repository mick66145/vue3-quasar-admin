<template>
  <role-auth-detail mode="edit" />
</template>

<script>
import { defineComponent } from 'vue-demi'
import RoleAuthDetail from './components/role-auth-detail/RoleAuthDetail.vue'

export default defineComponent({
  components: {
    RoleAuthDetail,
  },
})
</script>

<style lang="postcss" scoped>
</style>

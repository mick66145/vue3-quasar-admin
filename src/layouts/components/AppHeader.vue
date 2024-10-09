<template>
  <q-header class="bg-white text-grey z-[2000] shadow-1">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggle"
      />
      <q-space />
      <div class="row text-blue-grey-7 q-gutter-sm items-center no-wrap">
        <lang-select v-if="isShow.langSelect" />
        <user-info-item />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import UserInfoItem from './UserInfoItem.vue'
import { defineComponent, reactive } from 'vue-demi'
import { useApp } from '@/stores/app'
import { useUser } from '@/stores/user'
import useLogout from '@/hooks/useLogout'
export default defineComponent({
  components: {
    UserInfoItem,
  },
  setup (props, { emit }) {
    // data
    const storeApp = useApp()
    const storeUser = useUser()
    const userInfo = reactive(storeUser.info)
    const isShow = reactive({
      langSelect: true,
    })

    // methods
    const toggle = () => {
      storeApp.toggleSideBar()
    }

    const logout = () => {
      resetStore()
    }

    // use
    const { resetStore } = useLogout()

    return {
      userInfo,
      isShow,
      toggle,
      logout,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

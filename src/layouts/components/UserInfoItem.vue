<template>
  <q-btn dense round flat icon="fa-solid fa-user">
    <q-badge color="green" rounded floating transparent />
    <q-menu transition-show="scale" transition-hide="scale">
      <q-list class="min-w-[200px]">
        <q-item>
          <q-item-section avatar>
            <q-avatar icon="fa-solid fa-user" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ userInfo.name }}</q-item-label>
            <q-item-label caption lines="1">{{ userInfo.email }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item to="/profile" clickable>
          <q-item-section avatar>
            <q-avatar icon="fa-regular fa-user" />
          </q-item-section>
          <q-item-section>{{ $t('meun.profile') }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section avatar>
            <q-avatar icon="fa-solid fa-arrow-right-from-bracket" />
          </q-item-section>
          <q-item-section @click="logout">{{ $t('meun.logout') }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>

import { defineComponent, reactive } from 'vue-demi'
import { useApp } from '@/stores/app'
import { useUser } from '@/stores/user'
import useLogout from '@/hooks/useLogout'

export default defineComponent({
  setup (props, { emit }) {
    // data
    const storeApp = useApp()
    const storeUser = useUser()
    const userInfo = reactive(storeUser.info)

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
      toggle,
      logout,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

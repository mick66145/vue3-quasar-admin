<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <app-header />
    <sidebar />
    <q-page-container class="px-4">
      <router-view v-slot="{ Component,route }">
        <transition name="slide-fade">
          <div :key="route" class="q-mt-md">
            <component :is="Component" :key="route" />
          </div>
        </transition>
        <back-top />
      </router-view>
    </q-page-container>
    <app-footer />
  </q-layout>
</template>

<script>
import { AppHeader, AppFooter, Sidebar, BackTop } from './components'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader,
    AppFooter,
    Sidebar,
    BackTop,
  },
  setup () {
    return {}
  },
})
</script>

<style lang="postcss" scoped>
</style>

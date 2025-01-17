<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <app-header />
    <sidebar width="260" />
    <q-page-container>
      <router-view v-slot="{ Component,route }" class="p-4">
        <transition name="slide-fade">
          <div :key="route">
            <component :is="Component" :key="route" />
          </div>
        </transition>
        <back-top />
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { AppHeader, Sidebar, BackTop } from '@/layouts/components'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader,
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

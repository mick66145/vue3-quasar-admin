<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <app-header class="m-4" />
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
  </q-layout>
</template>

<script>
import { AppHeader, Sidebar, BackTop } from '@/layouts/components'
import { defineComponent } from 'vue-demi'

export default defineComponent({
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
:deep(.q-drawer) {
  @apply my-4 ml-4;
  @apply rounded-lg !w-[260px];
  .q-drawer__content {
    @apply rounded-lg;
  }
}
</style>

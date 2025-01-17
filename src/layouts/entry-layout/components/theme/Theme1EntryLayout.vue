<template>
  <q-layout>
    <q-page-container>
      <router-view v-slot="{ Component,route }">
        <transition name="slide-fade">
          <div :key="route">
            <component :is="Component" :key="route" />
          </div>
        </transition>
      </router-view>
      <app-footer />
    </q-page-container>
  </q-layout>
</template>

<script>
import { AppFooter } from '@/layouts/components'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  components: {
    AppFooter,
  },
  setup () {
    return {}
  },
})
</script>

<style lang="postcss" scoped>
.q-layout {
  background-image: url("@/assets/images/entry-images/bk.svg");
  background-color: #f5f5f5;
}
</style>

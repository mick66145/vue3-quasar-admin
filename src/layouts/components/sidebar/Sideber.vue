<template>
  <q-drawer
    v-model="sidebarOpened"
    show-if-above
    bordered
    :width="width"
    :class="`${bgColor} ${textColor}`"
  >
    <q-item-label
      header
      class="text-center text-white text-h6"
    >
      {{ $t('g.system.system-name') }}
    </q-item-label>
    <q-scroll-area
      class="h-[calc(95%_-_50px)]"
    >
      <q-list>
        <sidebar-item
          v-for="(routeItem, routeIndex) in routes"
          :key="routeIndex"
          :item="routeItem"
          :base-path="routeItem.path"
        />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import SidebarItem from './SidebarItem.vue'
import { defineComponent, computed } from 'vue-demi'
import { useApp } from '@/stores/app'
import { usePermission } from '@/stores/permission'
export default defineComponent({
  components: {
    SidebarItem,
  },
  props: {
    bgColor: { type: String, default: 'bg-grey-9' },
    textColor: { type: String, default: 'text-white' },
    width: { type: [Number, String] },
  },
  emits: ['toggle'],
  setup (props, { emit }) {
    // data
    const store = useApp()
    const storePermission = usePermission()

    // computed
    const sidebarOpened = computed({
      get () {
        return store.sidebar.opened
      },
      set () {
        store.toggleSideBar()
      },
    })
    const routes = computed(() => {
      return storePermission.routes
    })

    return {
      sidebarOpened,
      routes,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

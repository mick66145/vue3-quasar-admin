<template>
  <q-drawer
    v-model="sidebarOpened"
    show-if-above
    bordered
    :width="width"
    :class="`${observebgColor} ${observeTextColor}`"
  >
    <q-item-label
      header
      :class="`text-center ${observeTextColor} text-h6`"
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
          :active-class="observeActiveClass"
          :text-color="observeTextColor"
        />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import SidebarItem from './SidebarItem.vue'
import { defineComponent, computed, toRefs } from 'vue-demi'
import { useApp } from '@/stores/app'
import { usePermission } from '@/stores/permission'
export default defineComponent({
  components: {
    SidebarItem,
  },
  props: {
    bgColor: { type: String },
    textColor: { type: String },
    width: { type: [Number, String] },
    activeClass: { type: String },
  },
  emits: ['toggle'],
  setup (props, { emit }) {
    // data
    const storeApp = useApp()
    const storePermission = usePermission()
    const { bgColor, textColor, activeClass } = toRefs(props)

    // computed
    const sidebarOpened = computed({
      get () {
        return storeApp.sidebar.opened
      },
      set () {
        storeApp.toggleSideBar()
      },
    })
    const routes = computed(() => {
      return storePermission.routes
    })
    const observebgColor = computed(() => {
      return bgColor.value ? bgColor.value : storeApp.sidebar.bgColor
    })
    const observeTextColor = computed(() => {
      return textColor.value ? textColor.value : storeApp.sidebar.textColor
    })
    const observeActiveClass = computed(() => {
      return activeClass.value ? activeClass.value : storeApp.sidebar.activeClass
    })

    return {
      sidebarOpened,
      routes,
      observebgColor,
      observeTextColor,
      observeActiveClass,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

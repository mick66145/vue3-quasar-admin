<template>
  <div v-if="!item.hidden && item.children && !onlyOneChild?.noShowingChildren">
    <template v-if="onlyOneChild && !item.alwaysShow">
      <sidebar-link
        :key="onlyOneChild.path"
        :class="{ 'mx-4': !isNest }"
        :to="resolvePath(onlyOneChild.path)"
        :title="$t(onlyOneChild.meta.title)"
        :icon="onlyOneChild.meta.icon"
        :active-class="activeClass"
        @click="onclick(onlyOneChild)"
      />
    </template>

    <q-expansion-item
      v-else
      :key="item.groupName"
      v-model="open"
      :class="! isNest ? 'mx-4' : ''"
      :group="item.groupName"
      :header-class="headerClassActive"
      :expand-icon-class="expandIconClassActive"
      :header-inset-level="!isNest ? 0 : 0.05"
      :content-inset-level="!isNest ? 0.25 : 0.35"
    >
      <template #header>
        <q-item v-ripple="false">
          <q-item-section avatar>
            <q-icon :name="item.meta.icon" size="18px" />
          </q-item-section>
          <q-item-section>{{ $t(item.meta.title) }}</q-item-section>
        </q-item>
      </template>
      <q-list v-for="(childItem, childIndex) in visibleChildren" :key="childIndex" class="my-1">
        <sidebar-item
          v-if="childItem.children && childItem.children.length > 0"
          :is-nest="true"
          :item="childItem"
          :base-path="resolvePath(childItem.path)"
          :active-class="activeClass"
        />
        <sidebar-link
          v-else
          :key="childItem.path"
          :to="resolvePath(childItem.path)"
          :title="$t(childItem.meta.title)"
          :icon="childItem.meta.icon"
          :active-class="activeClass"
          @click="onclick(childItem)"
        />
      </q-list>
    </q-expansion-item>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import path from 'path'
import { defineComponent, ref, toRefs, computed, onMounted, watch } from 'vue-demi'
import { useRoute } from 'vue-router'
import useEventsBus from '@/hooks/useEventsBus'

export default defineComponent({
  components: {
    SidebarLink,
  },
  props: {
    item: { type: Object },
    activeHeaderClass: { type: String, default: 'active-header' },
    activeExpandIconClassClass: { type: String },
    activeClass: { type: String },
    textColor: { type: String },
    isNest: { type: Boolean, default: false },
    basePath: { type: String },
  },
  setup (props, { emit }) {
    // data
    const route = useRoute()
    const { item, activeHeaderClass, activeExpandIconClassClass, textColor, basePath } = toRefs(props)
    const open = ref(false)
    const active = ref(false)
    const headerClassDefault = ref(`${textColor} rounded-lg`)
    const expandIconClassDefault = ref(`${textColor}`)
    const headerClassActive = ref('')
    const expandIconClassActive = ref('')

    // use
    const { emit: busEmit, bus } = useEventsBus()

    // computed
    const visibleChildren = computed(() => {
      return item.value.children.filter((item) => !item.hidden)
    })
    const onlyOneChild = computed(() => {
      if (!item.value.children) {
        return item.value
      }
      let oneChild
      const showingChildren = item.value.children.filter((item) => {
        if (!item.hidden) {
          oneChild = item
        }
        return !item.hidden
      })
      if (item.value.meta.slug === 'link') return oneChild
      if (item.value.meta.slug === 'dropdown' && showingChildren.length !== 0) { return false }
      if (item.value.meta.slug === 'dropdown' && showingChildren.length === 0) {
        return { ...item.value, path: '', noShowingChildren: true }
      }

      return oneChild
    })

    // mounted
    onMounted(async () => {
      onclick(buildActiveItem(route.path))
    })

    // methods
    const onclick = (nodeData) => {
      busEmit('activeItem', nodeData)
      const currentItem = bus.value.get('activeItem')
      if (currentItem) {
        changeActiveHeaderStyle(currentItem[0])
      }
    }
    const activeItem = (currentItem) => {
      active.value = item.value.to === currentItem.to
      open.value = item.value.group ? item.value.group.filter(groupItem => selectMatchSidbarItem([currentItem.group], groupItem).length > 0).length > 0 : false
    }
    const buildActiveItem = (path) => {
      if (!path || path === '/') {
        path = '/dashboard'
      }
      const group = !path.substr(0, path.lastIndexOf('/')) ? path : path.substr(0, path.lastIndexOf('/'))
      return { to: path, group: group }
    }
    const changeActiveHeaderStyle = (currentItem) => {
      activeItem(currentItem)
      const isGroup = currentItem.group && item.value.group && item.value.group.filter(groupItem => selectMatchSidbarItem([currentItem.group], groupItem).length > 0).length > 0
      if (!isGroup) {
        headerClassActive.value = headerClassDefault.value
        expandIconClassActive.value = expandIconClassDefault.value
        return
      }
      headerClassActive.value = activeHeaderClass.value ? activeHeaderClass.value : headerClassDefault.value
      expandIconClassActive.value = activeExpandIconClassClass.value ? activeExpandIconClassClass.value : expandIconClassDefault.value
    }
    const resolvePath = (routePath) => {
      return path.resolve(basePath.value, routePath)
    }
    const selectMatchSidbarItem = (lists, keyWord) => {
      const resArr = []
      lists.filter(item => {
        const uri = item.toLowerCase().split('/')
        const keyWordUri = keyWord.toLowerCase().split('/')[1]
        uri.filter(uriItem => { if (uriItem === keyWordUri) { resArr.push(item) } return uri })
        return lists
      })
      return resArr
    }

    // watch
    watch(() => route, (newValue) => {
      onclick(buildActiveItem(newValue.path))
    }, { deep: true })

    return {
      open,
      headerClassActive,
      expandIconClassActive,
      onlyOneChild,
      visibleChildren,
      onclick,
      resolvePath,
      selectMatchSidbarItem,
    }
  },
})
</script>

<style lang="postcss" scoped>
:deep(.active-header) {
  .q-focus-helper {
    @apply bg-current rounded-lg opacity-15;
  }
}
:deep(.q-expansion-item__container) {
  .q-item {
    @apply p-0 w-full;
  }
}
</style>

<template>
  <q-card class="shadow-0 permissions-card" bordered>
    <q-card-section vertical class="p-0" :class="{ 'bg-gray-100': permissionItem.childs.length > 0 }">
      <div class="p-2 row items-center">
        <span class="h-full col-md-4 col-sm-6 permissions-title" :class="{ 'text-h6': permissionItem.childs.length > 0 }">
          {{ permissionItem.name }}
        </span>
        <div class="col-md-4 col-sm-6">
          <input-checkbox
            v-model="permissionItem.allSelectd"
            label="全選"
            @update:modelValue="permissionItem.onSelectAll(permissionItem.allSelectd); refreshAllSelectd()"
          />
        </div>
        <div v-for="permissionItem in permissionItem.permissions" :key="permissionItem" class="flex col-md-4 col-sm-6">
          <input-checkbox
            v-model="permissionItem.is_active"
            :label="permissionItem.display_name"
            :val="permissionItem"
            @update:modelValue="permissionItem.refreshAllSelectd(); refreshAllSelectd()"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
  <div v-for="childItem in permissionItem.childs" :key="childItem" class="col-24 ml-4">
    <permission-card :permission-item="childItem" />
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    permissionItem: { type: Object, default: () => ({}) },
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped>
.permissions-card {
  @apply mb-1;
  .permissions-title {
    @apply m-0 pl-3 self-center;
  }
}
</style>

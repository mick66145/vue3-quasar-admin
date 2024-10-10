<template>
  <div class="p-2">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card>
          <card-header>
            {{ $t('role.detail.card.permission-setting.title') }}
          </card-header>
          <card-body class="q-pt-none">
            <input-checkbox v-model="allSelectd" label="全選" @update:modelValue="onSelectAll" />
            <div class="row q-col-gutter-md">
              <div v-for="menuPermissionItem in menuPermissionList" :key="menuPermissionItem" class="col-12">
                <q-card class="shadow-0 permissions-card" bordered>
                  <q-card-section class="bg-gray-100">
                    <div class="row items-center">
                      <div v-for="permissionItem in menuPermissionItem.permissions" :key="permissionItem">
                        <input-checkbox v-model="permissionItem.is_active" :val="permissionItem" />
                      </div>
                      <div class="!ml-2 text-h6">{{ menuPermissionItem.name }}</div>
                    </div>
                  </q-card-section>
                  <q-card-section vertical class="p-0">
                    <div v-for="(childItem, index) in menuPermissionItem.childs" :key="childItem">
                      <div class="p-2 row items-center">
                        <span class="h-full col-md-2 col-sm-3 permissions-title ">
                          {{ childItem.name }}
                        </span>
                        <div class="col-md-2 col-sm-3">
                          <input-checkbox
                            v-model="childItem.allSelectd"
                            label="全選"
                            @update:modelValue="childItem.onSelectAll(childItem.allSelectd); refreshAllSelectd()"
                          />
                        </div>
                        <div
                          v-for="permissionItem in childItem.permissions"
                          :key="permissionItem"
                          class="flex col-md-2 col-sm-3"
                        >
                          <input-checkbox
                            v-model="permissionItem.is_active"
                            :label="permissionItem.display_name"
                            :val="permissionItem"
                            @update:modelValue="childItem.refreshAllSelectd(); refreshAllSelectd()"
                          />
                        </div>
                      </div>
                      <q-separator v-show="menuPermissionItem.childs.length - 1 !== index" class="w-full" />
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </card-body>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue-demi'
import { MenuPermissionResource } from '@core/modules/permission/api'
import { breadthFirstSearch } from '@/utils/tree'
import useCRUD from '@/hooks/useCRUD'

const menuPermissionResource = MenuPermissionResource({})

export default defineComponent({
  props: {
    permissions: { type: Array, default () { return [] } },
  },
  setup (props) {
    // data
    const allSelectd = ref(false)
    const menuPermissionList = ref([])

    // methods
    const fetchMenuPermissionData = () => {
      return menuPermissionResource.list({}).then((res) => {
        menuPermissionList.value = []
        menuPermissionList.value = res.list
      })
    }
    const onSelectAll = (value) => {
      menuPermissionList.value.forEach(element => { element.onSelectAll(value) })
    }
    const refreshAllSelectd = () => {
      allSelectd.value = menuPermissionList.value.every(element => element.everyAllSelectd())
    }
    const setPermissions = async (permissions) => {
      menuPermissionList.value.forEach(element => { element.setPermission(permissions) })
      refreshAllSelectd()
    }
    const getPermissions = async () => {
      await callMenuPermissionListFetch()
    }
    const getActivePermissions = () => {
      const permissions = []
      breadthFirstSearch(menuPermissionList.value, node => {
        node.permissions.forEach(element => {
          (element.is_active) && (permissions.push(element))
        })
      })
      return permissions
    }

    // watch
    watch(() => props.permissions, (data) => { setPermissions(data) })

    // use
    const { callReadListFetch: callMenuPermissionListFetch } = useCRUD({
      readListFetch: fetchMenuPermissionData,
    })

    return {
      allSelectd,
      menuPermissionList,
      onSelectAll,
      refreshAllSelectd,
      setPermissions,
      getPermissions,
      getActivePermissions,
    }
  },
})
</script>

<style lang="postcss" scoped>
.permissions-card {
  @apply mb-4;
  .permissions-title {
    @apply m-0 pl-3 self-center;
  }
}
</style>

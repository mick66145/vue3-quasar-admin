<template>
  <div class="p-2">
    <div class="row q-col-gutter-md">
      <div class="col-24">
        <q-card>
          <card-header>
            {{ $t('role.detail.card.permission-setting.title') }}
          </card-header>
          <card-body class="q-pt-none">
            <input-checkbox v-model="allSelectd" label="全選" @update:modelValue="onSelectAll" />
            <div class="row q-col-gutter-md">
              <div v-for="menuPermissionItem in menuPermissionList" :key="menuPermissionItem" class="col-24">
                <permission-card :permission-item="menuPermissionItem" />
              </div>
            </div>
          </card-body>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { PermissionCard } from '@core/modules/permission/components'
import { defineComponent, ref, watch } from 'vue-demi'
import { FrontendMenuPermissionResource } from '@core/modules/permission/api'
import { breadthFirstSearch } from '@/utils/tree'
import useCRUD from '@/hooks/useCRUD'

const menuPermissionResource = FrontendMenuPermissionResource({})

export default defineComponent({
  components: {
    PermissionCard,
  },
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

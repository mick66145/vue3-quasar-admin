<template>
  <base-page>
    <page-header>
      {{ $t('role.title') }}
      <template #action>
        <add-button
          v-permission="['create role']"
          to="/role/create"
        />
      </template>
    </page-header>

    <q-card>
      <card-body>
        <role-list-search-block
          v-model="search"
          class="q-mb-sm"
          @changeFilter="onChangeFilter"
          @reset="onReset"
        />
        <vxe-server-table
          ref="dataTable"
          :data="data"
          :total="total"
          :current="search.page"
          @sort-change="onChangeSort"
          @update:current="onChangePage"
        >
          <vxe-column
            v-for="{ field, title, min_width } in tableFields"
            :key="field"
            :field="field"
            :title="`${$t(title)}`"
            :min-width="min_width"
          />
          <vxe-column :title="`${$t('g.common.operate')}`" fixed="right" width="115">
            <template #default="{ row }">
              <div class="row">
                <edit-icon-button
                  v-permission="['update role']"
                  class="q-mr-xs q-mb-xs"
                  :to="'/role/edit/' + row.id"
                />
                <delete-icon-button
                  v-permission="['delete role']"
                  class="q-mr-xs q-mb-xs"
                  @click="onDelete(row)"
                />
              </div>
            </template>
          </vxe-column>
        </vxe-server-table>
      </card-body>
    </q-card>
  </base-page>
</template>

<script>
import RoleListSearchBlock from './components/RoleListSearchBlock.vue'
import { defineComponent, reactive } from 'vue-demi'
import { RoleResource } from '@core/modules/role/api'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import useMessageDialog from '@/hooks/useMessageDialog'

const roleResource = RoleResource({})

export default defineComponent({
  components: {
    RoleListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
      guard_name: 'api',
    })
    const tableFields = reactive([
      { title: 'g.common.created-at', field: 'created_at', min_width: '130' },
      { title: 'role.form.name', field: 'name', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => roleResource.list({ query })
    const delFetch = (id) => roleResource.destroy({ id })
    const refreshFetch = () => getDataList({ ...search })
    const onDelete = async (row) => {
      const res = await messageDelete({ message: i18n.global.t('g.dialog.delete-message', { item: i18n.global.t('g.common.role') }) })
      if (!res) return
      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        onRefresh()
      }
    }

    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset, onRefresh } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'id', order: 'desc' }],
      sessionStorageKey: 'dashboardRoleServerDataTable',
      callback: refreshFetch,
    })
    const { messageDelete } = useMessageDialog()
    const { callDeleteFetch, callReadListFetch: getDataList } = useCRUD({
      deleteFetch: delFetch,
      readListFetch: fetchData,
    })

    return {
      dataTable,
      tableFields,
      data,
      total,
      search,
      onChangePage,
      onChangeFilter,
      onChangeSort,
      onReset,
      onDelete,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

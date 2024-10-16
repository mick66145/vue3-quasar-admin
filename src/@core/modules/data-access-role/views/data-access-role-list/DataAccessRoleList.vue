<template>
  <base-page>
    <page-header>
      {{ $t('data-access-role.title') }}
      <template #action>
        <add-button v-permission="['create data_access_role']" to="/data-access-role/create" />
      </template>
    </page-header>

    <q-card>
      <card-body>
        <dataAccessRole-list-search-block
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
                  v-permission="['update data_access_role']"
                  class="q-mr-xs q-mb-xs"
                  :to="`/data-access-role/edit/${row.id}`"
                />
                <delete-icon-button
                  v-permission="['delete data_access_role']"
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
import DataAccessRoleListSearchBlock from './components/DataAccessRoleListSearchBlock.vue'
import { defineComponent, reactive } from 'vue-demi'
import { DataAccessRoleResource } from '@core/modules/data-access-role/api'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import useMessageDialog from '@/hooks/useMessageDialog'

const dataAccessRoleResource = DataAccessRoleResource({})

export default defineComponent({
  components: {
    DataAccessRoleListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = reactive([
      { title: 'g.common.created-at', field: 'created_at', min_width: '130' },
      { title: 'data-access-role.form.name', field: 'name', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => dataAccessRoleResource.list({ query })
    const delFetch = (id) => dataAccessRoleResource.destroy({ id })
    const refreshFetch = () => getDataList({ ...search })
    const onDelete = async (row) => {
      const res = await messageDelete({ message: i18n.global.t('g.dialog.delete-message', { item: i18n.global.t('g.common.data-access-role') }) })
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
      sessionStorageKey: 'dashboardDataAccessRoleServerDataTable',
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

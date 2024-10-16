<template>
  <base-page>
    <page-header>
      {{ $t('member-role-auth.title') }}
    </page-header>

    <q-card>
      <card-body>
        <member-role-auth-list-search-block
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
          <vxe-column :title="`${$t('g.common.operate')}`" fixed="right" width="80">
            <template #default="{ row }">
              <div class="row">
                <edit-icon-button
                  class="q-mr-xs q-mb-xs"
                  :to="'/member-role-auth/edit/' + row.id"
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
import MemberRoleAuthListSearchBlock from './components/MemberRoleAuthListSearchBlock.vue'
import { defineComponent, reactive } from 'vue-demi'
import { RoleResource } from '@core/modules/role/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const roleResource = RoleResource({})

export default defineComponent({
  components: {
    MemberRoleAuthListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
      guard_name: 'client_api',
    })
    const tableFields = reactive([
      { title: 'g.common.created-at', field: 'created_at', min_width: '130' },
      { title: 'member-role.form.name', field: 'name', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => roleResource.list({ query })
    const refreshFetch = () => getDataList({ ...search })

    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'id', order: 'desc' }],
      sessionStorageKey: 'dashboardMemberRoleAuthServerDataTable',
      callback: refreshFetch,
    })
    const { callReadListFetch: getDataList } = useCRUD({
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
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

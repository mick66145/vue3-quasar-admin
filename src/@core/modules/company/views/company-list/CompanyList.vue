<template>
  <base-page>
    <page-header>
      {{ $t('company.title') }}
      <template #action>
        <add-button
          v-permission="['create company']"
          to="/company/create"
        />
      </template>
    </page-header>

    <q-card>
      <card-body>
        <company-list-search-block
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
                  v-permission="['update company']"
                  class="q-mr-xs q-mb-xs"
                  :to="'/company/edit/' + row.id"
                />
                <delete-icon-button
                  v-permission="['delete company']"
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
import CompanyListSearchBlock from './components/CompanyListSearchBlock.vue'
import { defineComponent, ref, reactive } from 'vue-demi'
import { CompanyResource } from '@core/modules/company/api'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import useMessageDialog from '@/hooks/useMessageDialog'

const companyResource = CompanyResource({})

export default defineComponent({
  components: {
    CompanyListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = ref([
      { title: 'company.form.name', field: 'name', min_width: '130' },
      { title: 'g.common.tel', field: 'tel', min_width: '130' },
      { title: 'company.form.customer-service-hotline', field: 'tel_service', min_width: '130' },
      { title: 'g.common.address', field: 'address_text', min_width: '130' },
      { title: 'g.common.email', field: 'email', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => companyResource.list({ query })
    const delFetch = (id) => companyResource.destroy({ id })
    const refreshFetch = () => getDataList({ ...search })
    const onDelete = async (row) => {
      const res = await messageDelete({ message: i18n.global.t('g.dialog.delete-message', { item: i18n.global.t('g.common.company') }) })
      if (!res) return
      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        onRefresh()
      }
    }

    // use
    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset, onRefresh } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'id', order: 'desc' }],
      sessionStorageKey: 'dashboardCompanyServerDataTable',
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

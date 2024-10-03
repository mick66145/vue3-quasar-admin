<template>
  <base-page>
    <page-header>
      {{ $t('mailinfo.title') }}
    </page-header>

    <q-card>
      <card-body>
        <mailinfo-list-search-block
          v-model="search"
          class="q-mb-sm"
          @changeFilter="onChangeFilter"
          @reset="onReset"
        />
        <vxe-server-table
          ref="dataTable"
          class="q-mb-md"
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
                  v-permission="['update mailinfo_manage']"
                  class="q-mr-xs q-mb-xs"
                  :to="`/mailinfo/edit/${row.id}`"
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
import MailinfoListSearchBlock from './components/MailinfoListSearchBlock.vue'
import { defineComponent, reactive } from 'vue-demi'
import { MailinfoResource } from '@core/modules/mailinfo/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const mailinfoResource = MailinfoResource({})

export default defineComponent({
  components: {
    MailinfoListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = reactive([
      { title: 'mailinfo.form.name', field: 'name', min_width: '130' },
      { title: 'mailinfo.form.subject', field: 'subject', min_width: '130' },
      { title: 'mailinfo.form.fromname', field: 'fromname', min_width: '130' },
      { title: 'mailinfo.form.repeatname', field: 'repeatname', min_width: '130' },
      { title: 'mailinfo.form.repeatmail', field: 'repeatmail', min_width: '130' },
    ])
    // methods
    const fetchData = (query) => mailinfoResource.list({ query })
    const refreshFetch = () => getDataList({ ...search })

    // use
    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{
        field: 'id',
        order: 'desc',
      }],
      sessionStorageKey: 'dashboardMailinfoServerDataTable',
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

<template>
  <base-page>
    <page-header>
      {{ $t('operate-log.title') }}
    </page-header>

    <q-card>
      <card-body>
        <operate-log-list-search-block
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
        </vxe-server-table>
      </card-body>
    </q-card>
  </base-page>
</template>

<script>
import OperateLogListSearchBlock from './components/OperateLogListSearchBlock.vue'
import { defineComponent, reactive } from 'vue-demi'
import { SystemResource } from '@core/modules/system/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const systemResource = SystemResource({})

export default defineComponent({
  components: {
    OperateLogListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = reactive([
      { title: 'user.form.name', field: 'user.name', min_width: '130' },
      { title: 'g.common.account', field: 'user.account', min_width: '130' },
      { title: 'g.common.created-at', field: 'created_at', min_width: '130' },
      { title: 'operate-log.form.description', field: 'description', min_width: '130' },
      { title: 'g.common.sourceip', field: 'sourceip', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => systemResource.recordLoglist({ query })
    const refreshFetch = () => getDataList({ ...search })

    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'id', order: 'desc' }],
      sessionStorageKey: 'dashboardOperateLogServerDataTable',
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

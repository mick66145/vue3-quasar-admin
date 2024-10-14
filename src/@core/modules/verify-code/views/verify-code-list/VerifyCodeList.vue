<template>
  <base-page>
    <page-header>
      {{ $t('verify-code.title') }}
    </page-header>
    <q-card>
      <card-body>
        <verify-code-list-search-block
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
import VerifyCodeListSearchBlock from './components/VerifyCodeListSearchBlock.vue'
import { defineComponent, reactive } from 'vue-demi'
import { VerifyCodeResource } from '@core/modules/verify-code/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const verifyCodeResource = VerifyCodeResource({})

export default defineComponent({
  components: {
    VerifyCodeListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = reactive([
      { title: 'g.common.captcha', field: 'token', min_width: '130' },
      { title: 'g.common.token', field: 'jwt_token', min_width: '130' },
      { title: 'g.common.type', field: 'type_text', min_width: '130' },
      { title: 'g.common.account', field: 'account', min_width: '130' },
      { title: 'g.common.phone', field: 'phone', min_width: '130' },
      { title: 'g.common.email', field: 'email', min_width: '130' },
      { title: 'g.common.sourceip', field: 'ip', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => verifyCodeResource.list({ query })
    const refreshFetch = () => getDataList({ ...search })

    // use
    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'id', order: 'desc' }],
      sessionStorageKey: 'dashboardVerifyCodeServerDataTable',
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

<style lang="postcss" scoped></style>

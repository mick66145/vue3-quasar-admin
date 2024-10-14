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
          <vxe-column :title="`${$t('g.common.operate')}`" fixed="right" width="55">
            <template #default="{ row }">
              <div class="row">
                <view-icon-button
                  class="q-mr-xs q-mb-xs"
                  @click="showDialog({ id:row.id, mode:'view', callRead:true })"
                />
              </div>
            </template>
          </vxe-column>
        </vxe-server-table>
      </card-body>
    </q-card>
    <verify-code-dialog ref="dialog" />
  </base-page>
</template>

<script>
import { VerifyCodeDialog } from '@core/modules/verify-code/components'
import VerifyCodeListSearchBlock from './components/VerifyCodeListSearchBlock.vue'
import { defineComponent, ref, reactive } from 'vue-demi'
import { VerifyCodeResource } from '@core/modules/verify-code/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const verifyCodeResource = VerifyCodeResource({})

export default defineComponent({
  components: {
    VerifyCodeDialog,
    VerifyCodeListSearchBlock,
  },
  setup () {
    // ref
    const dialog = ref()

    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = reactive([
      { title: 'g.common.captcha', field: 'token', min_width: '130' },
      { title: 'g.common.type', field: 'type_text', min_width: '130' },
      { title: 'g.common.account', field: 'account', min_width: '130' },
      { title: 'g.common.phone', field: 'phone', min_width: '130' },
      { title: 'g.common.email', field: 'email', min_width: '130' },
      { title: 'g.common.sourceip', field: 'ip', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => verifyCodeResource.list({ query })
    const refreshFetch = () => getDataList({ ...search })
    const showDialog = ({ id, data, mode, callRead }) => {
      dialog.value.showDialog({ id, data, mode, callRead })
    }

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
      dialog,
      dataTable,
      tableFields,
      data,
      total,
      search,
      onChangePage,
      onChangeFilter,
      onChangeSort,
      onReset,
      showDialog,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

<template>
  <base-page>
    <page-header>
      {{ $t('language-data.title') }}
    </page-header>
    <q-card>
      <card-body>
        <language-data-list-search-block
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
                <edit-icon-button v-permission="['update language_data']" class="q-mr-xs q-mb-xs" :to="`/language-data/edit/${row.id}`" />
              </div>
            </template>
          </vxe-column>
        </vxe-server-table>
      </card-body>
    </q-card>
  </base-page>
</template>

<script>
import LanguageDataListSearchBlock from './components/LanguageDataListSearchBlock.vue'
import { defineComponent, reactive } from 'vue-demi'
import { LanguageDataResource } from '@core/modules/language/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const languageDataResource = LanguageDataResource({})

export default defineComponent({
  components: {
    LanguageDataListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = reactive([
      { title: 'g.common.field-label', field: 'label', min_width: '130' },
      { title: 'g.common.value', field: 'value', min_width: '130' },
      { title: 'g.common.usage-type', field: 'usage_type', min_width: '130' },
      { title: 'g.common.locale', field: 'locale', min_width: '130' },
      { title: 'g.common.sequence', field: 'sequence', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => languageDataResource.list({ query })
    const updateFetch = (id, payload) => languageDataResource.patch({ id, payload })
    const refreshFetch = () => getDataList({ ...search })
    const onDisplay = async (row) => {
      const payload = { is_enable: row.is_enable }
      const urlObj = {
        edit: () => callUpdateFetch(row.id, { ...payload }),
      }
      const [res] = await urlObj.edit()
      if (res) refreshFetch()
    }

    // use
    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'sequence', order: 'asc' }, { field: 'id', order: 'desc' }],
      sessionStorageKey: 'dashboardLanguageDataServerDataTable',
      callback: refreshFetch,
    })
    const { callReadListFetch: getDataList, callUpdateFetch } = useCRUD({
      readListFetch: fetchData,
      updateFetch: updateFetch,
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
      onDisplay,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

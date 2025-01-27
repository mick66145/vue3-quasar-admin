<template>
  <base-page>
    <page-header>
      {{ $t('language-content-form-field.title') }}
    </page-header>
    <q-card>
      <card-body>
        <language-content-form-field-list-search-block
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
                <edit-icon-button class="q-mr-xs q-mb-xs" :to="`/language-content-form-field/edit/${row.id}`" />
              </div>
            </template>
          </vxe-column>
        </vxe-server-table>
      </card-body>
    </q-card>
  </base-page>
</template>

<script>
import LanguageContentFormFieldListSearchBlock from './components/LanguageContentFormFieldListSearchBlock.vue'
import { defineComponent, reactive } from 'vue-demi'
import { LanguageContentFormResource } from '@core/modules/language/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const languageContentFormResource = LanguageContentFormResource({})

export default defineComponent({
  components: {
    LanguageContentFormFieldListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = reactive([
      { title: 'language-content-form.form.name', field: 'name', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => languageContentFormResource.list({ query })
    const refreshFetch = () => getDataList({ ...search })

    // use
    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'sequence', order: 'asc' }, { field: 'id', order: 'desc' }],
      sessionStorageKey: 'dashboardLanguageContentFormFieldServerDataTable',
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

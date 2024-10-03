<template>
  <base-page>
    <page-header>
      {{ $t('language-setting.title') }}
      <template #action>
        <add-button v-permission="['create language_setting']" to="/language-setting/create" />
      </template>
    </page-header>
    <q-card>
      <card-body>
        <language-setting-list-search-block
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
          <vxe-column :title="`${$t('g.common.is-enable')}`" width="155">
            <template #default="{ row }">
              <input-toggle
                v-model="row.is_enable"
                :label="row.is_enable ? $t('g.common.enable') : $t('g.common.un-enable')"
                :left-label="row.is_enable"
                @update:modelValue="onDisplay(row)"
              />
            </template>
          </vxe-column>
          <vxe-column :title="`${$t('g.common.operate')}`" fixed="right" width="80">
            <template #default="{ row }">
              <div class="row">
                <edit-icon-button v-permission="['update language_setting']" class="q-mr-xs q-mb-xs" :to="`/language-setting/edit/${row.id}`" />
              </div>
            </template>
          </vxe-column>
        </vxe-server-table>
      </card-body>
    </q-card>
  </base-page>
</template>

<script>
import LanguageSettingListSearchBlock from './components/LanguageSettingListSearchBlock.vue'
import { defineComponent, reactive } from 'vue-demi'
import { LanguageSettingResource } from '@core/modules/language/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const languageSettingResource = LanguageSettingResource({})

export default defineComponent({
  components: {
    LanguageSettingListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = reactive([
      { title: 'language-setting.form.name', field: 'name', min_width: '130' },
      { title: 'g.common.sequence', field: 'sequence', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => languageSettingResource.list({ query })
    const updateFetch = (id, payload) => languageSettingResource.patch({ id, payload })
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
      sessionStorageKey: 'dashboardLanguageSettingServerDataTable',
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

<template>
  <base-page>
    <page-header>
      {{ $t('frontend-menu.title') }}
      <template #action>
        <add-button
          v-permission="['create frontend_menu']"
          to="/frontend-menu/create"
        />
      </template>
    </page-header>
    <q-card>
      <card-body>
        <vxe-server-table
          ref="dataTable"
          :data="data"
          :total="total"
          :current="search.page"
          :tree-config="{transform: true,iconOpen:'vxe-icon-minus',iconClose:'vxe-icon-add'}"
          :show-pagination="false"
          @update:current="onChangePage"
        >
          <vxe-column :title="`${$t('frontend-menu.form.name')}`" min-width="200" field="name" tree-node />
          <vxe-column :title="`${$t('g.common.sequence')}`" width="200" field="sequence" />
          <vxe-column :title="`${$t('g.common.enable')}`" width="160">
            <template #default="{row}">
              <input-toggle
                v-model="row.is_enable"
                :label="row.is_enable ? $t('g.common.enable') : $t('g.common.un-enable')"
                @update:modelValue="onEnable(row)"
              />
            </template>
          </vxe-column>
          <vxe-column :title="`${$t('g.common.operate')}`" fixed="right" width="160">
            <template #default="{ row }">
              <div class="row">
                <edit-icon-button
                  v-permission="['update frontend_menu']"
                  class="q-mr-xs q-mb-xs"
                  :to="`/frontend-menu/edit/${row.id}`"
                />
                <add-icon-button
                  v-if="row.type === frontendMenuTypes.dropdown"
                  v-permission="['create frontend_menu']"
                  class="q-mr-xs q-mb-xs"
                  @click="onAddSubFrontendMenu(row)"
                />
                <delete-icon-button
                  v-permission="['delete frontend_menu']"
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
import { defineComponent, reactive } from 'vue-demi'
import { useFrontendMenuStore } from '@core/modules/frontend-menu/stores'
import { frontendMenuTypes } from '@core/modules/frontend-menu/config/config-frontend-menu'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import useMessageDialog from '@/hooks/useMessageDialog'
import useNavigation from '@/hooks/useNavigation'

export default defineComponent({
  setup () {
    // data
    const frontendMenuStore = useFrontendMenuStore()
    const filter = reactive({
      keyword: null,
      frontend_menu_id: null,
      page_size: null,
    })

    // methods
    const fetchData = (query) => frontendMenuStore.list({ query })
    const updateFetch = (id, payload) => frontendMenuStore.patch({ id, payload })
    const delFetch = (id) => frontendMenuStore.destroy({ id })
    const refreshFetch = () => getDataList({ ...mapFilter() })
    const mapFilter = (usePage = true) => {
      const filter = { ...search }
      filter.page = usePage ? filter.page : null
      filter.page_size = usePage ? filter.page_size : null
      filter.frontend_menu_id = filter.frontend_menu_id ? filter.frontend_menu_id.id : null
      return filter
    }
    const onDelete = async (row) => {
      const res = await messageDelete({ message: i18n.global.t('g.dialog.delete-message', { item: i18n.global.t('g.common.frontend-menu') }) })
      if (!res) return
      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        onRefresh()
      }
    }
    const onEnable = async (row) => {
      const payload = { is_enable: row.is_enable }
      const urlObj = {
        edit: () => {
          return callUpdateFetch(row.id, { ...payload })
        },
      }
      const [res] = await urlObj.edit()
      if (res) onRefresh()
    }
    const onAddSubFrontendMenu = (row) => {
      onNavigation({ state: { parent: { id: row.id } } })
    }

    // use
    const { dataTable, search, data, total, onChangePage, onChangeSort, onChangeFilter, onReset, onRefresh } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'sequence', order: 'asc' }, { field: 'created_at', order: 'desc' }],
      unSessionStorageParames: [{ field: 'page_size' }],
      sessionStorageKey: 'dashboardFrontendMenuServerDataTable',
      callback: refreshFetch,
    })
    const { callUpdateFetch, callDeleteFetch, callReadListFetch: getDataList } = useCRUD({
      updateFetch: updateFetch,
      deleteFetch: delFetch,
      readListFetch: fetchData,
    })
    const { messageDelete } = useMessageDialog()
    const { onNavigation } = useNavigation({
      to: { name: 'FrontendMenuCreate' },
      useStore: true,
    })

    return {
      dataTable,
      data,
      total,
      search,
      frontendMenuTypes,
      onChangePage,
      onChangeSort,
      onChangeFilter,
      onReset,
      onDelete,
      onEnable,
      onAddSubFrontendMenu,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

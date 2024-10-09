<template>
  <base-page>
    <page-header>
      {{ $t('frontend-menu.title') }}
      <template #action>
        <add-button
          v-permission="['create frontend_menu']"
          @click="showDialog({})"
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
          <vxe-column :title="`${$t('g.common.is-enable')}`" width="160">
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
                  @click="showDialog({ id:row.id, mode:'edit', callRead:true })"
                />
                <add-icon-button
                  v-permission="['create frontend_menu']"
                  class="q-mr-xs q-mb-xs"
                  @click="showDialog({ data: { parent:row} })"
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
    <frontend-menu-dialog ref="dialog" @confirm="refreshFetch" />
  </base-page>
</template>

<script>
import FrontendMenuDialog from './components/FrontendMenuDialog.vue'
import { defineComponent, ref, reactive } from 'vue-demi'
import { FrontendMenuResource } from '@core/modules/frontend-menu/api'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import useMessageDialog from '@/hooks/useMessageDialog'

const frontendMenuResource = FrontendMenuResource({})

export default defineComponent({
  components: {
    FrontendMenuDialog,
  },
  setup () {
    // data
    const dialog = ref()
    const filter = reactive({
      keyword: null,
      frontend_menu_id: null,
      page_size: null,
    })

    // methods
    const fetchData = async (query) => {
      return await frontendMenuResource.list({ query }).then((res) => {
        data.value = []
        data.value = res.list
        total.value = res.total
      })
    }
    const updateFetch = (id, payload) => frontendMenuResource.patch({ id, payload })
    const delFetch = (id) => frontendMenuResource.destroy({ id })
    const onDelete = async (row) => {
      const res = await messageDelete({ message: i18n.global.t('g.dialog.delete-message', { item: i18n.global.t('g.common.frontend-menu') }) })
      if (!res) return
      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        refreshFetch()
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
      if (res) refreshFetch()
    }
    const showDialog = ({ id, data, mode, callRead }) => {
      dialog.value.showDialog({ id, data, mode, callRead })
    }

    const refreshFetch = async () => {
      const filter = { ...search }
      filter.frontend_menu_id = filter.frontend_menu_id ? filter.frontend_menu_id.id : null
      await getDataList(filter)
    }

    const { dataTable, search, data, total, onChangePage, onChangeSort, onChangeFilter, onReset } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'sequence', order: 'asc' }],
      unSessionStorageParames: [{ field: 'page_size' }],
      sessionStorageKey: 'dashboardFrontendMenuServerDataTable',
      callback: refreshFetch,
    })
    const { messageDelete } = useMessageDialog()
    const { callUpdateFetch, callDeleteFetch, callReadListFetch: getDataList } = useCRUD({
      updateFetch: updateFetch,
      deleteFetch: delFetch,
      readListFetch: fetchData,
    })

    return {
      dataTable,
      dialog,
      data,
      total,
      search,
      onChangePage,
      onChangeSort,
      onChangeFilter,
      onReset,
      onDelete,
      onEnable,
      showDialog,
      refreshFetch,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

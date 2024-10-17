<template>
  <base-dialog v-model="isShowDialog" size="lg" :show-confirm="false">
    <div class="row">
      <div class="col-24">
        <input-search v-model="search.keyword" class="full-width" dense @update:modelValue="onChangeFilter" />
      </div>
      <div class="col-24">
        <vxe-server-table
          ref="dataTable"
          class="q-mb-md"
          :data="data"
          :total="total"
          :current="search.page"
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
                <base-icon-button icon="add_circle" label="加入" @click="onAdd(row)" />
              </div>
            </template>
          </vxe-column>
        </vxe-server-table>
      </div>
    </div>
  </base-dialog>
</template>

<script>
import { defineComponent, reactive } from 'vue-demi'
import { UserResource } from '@core/modules/user/api'
import useCRUD from '@/hooks/useCRUD'
import useDialog from '@/hooks/useDialog'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const userResource = UserResource({})

export default defineComponent({
  emits: ['add'],
  setup (props, { emit }) {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = reactive([
      { title: 'g.common.account', field: 'account', min_width: '130' },
      { title: 'user.form.name', field: 'name', min_width: '130' },
      { title: 'g.common.email', field: 'email', min_width: '130' },
      { title: 'user.form.company', field: 'company.name', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => userResource.list({ query })
    const refreshFetch = () => callReadListFetch({ ...search })
    const showDialog = ({ data }) => {
      isShowDialog.value = true
      refreshFetch()
    }
    const onAdd = (value) => {
      emit('add', value)
      hideDialog()
    }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })
    const { isShowDialog, hideDialog } = useDialog({})
    const { dataTable, search, data, total, onChangePage, onChangeFilter } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'id', order: 'desc' }],
      sessionStorageKey: 'dashboardUserDialogServerDataTable',
      callback: refreshFetch,
    })

    return {
      dataTable,
      data,
      total,
      search,
      tableFields,
      isShowDialog,
      showDialog,
      onChangePage,
      onChangeFilter,
      onAdd,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

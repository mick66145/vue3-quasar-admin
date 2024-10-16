<template>
  <base-page>
    <page-header>
      {{ $t('user.title') }}
      <template #action>
        <add-button
          v-permission="['create user']"
          to="/user/create"
        />
      </template>
    </page-header>

    <q-card>
      <card-body>
        <user-list-search-block
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
          <vxe-column :title="`${$t('g.common.operate')}`" fixed="right" :width="$q.screen.lt.sm ? 115 : 171">
            <template #default="{ row }">
              <div class="row">
                <edit-icon-button
                  v-permission="['update user']"
                  class="q-mr-xs q-mb-xs"
                  :to="'/user/edit/' + row.id"
                />
                <base-icon-button
                  v-permission="['update user']"
                  icon="key"
                  class="q-mr-xs q-mb-xs"
                  color="black"
                  :label="$t('g.btn.reset-password')"
                  @click="onResetPassword(row)"
                />
                <delete-icon-button
                  v-permission="['delete user']"
                  class="q-mb-xs"
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
import UserListSearchBlock from './components/UserListSearchBlock.vue'
import { defineComponent, reactive } from 'vue-demi'
import { UserResource } from '@core/modules/user/api'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import useMessageDialog from '@/hooks/useMessageDialog'

const userResource = UserResource({})

export default defineComponent({
  components: {
    UserListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = reactive([
      { title: 'g.common.account', field: 'account', min_width: '130' },
      { title: 'user.form.name', field: 'name', min_width: '130' },
      { title: 'g.common.email', field: 'email', min_width: '130' },
      { title: 'user.form.company', field: 'company.name', min_width: '130' },
      { title: 'user.form.role', field: 'role.name', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => userResource.list({ query })
    const delFetch = (id) => userResource.destroy({ id })
    const resetPasswordFetch = (id) => userResource.resetPassword({ id })
    const refreshFetch = () => callReadListFetch({ ...search })
    const onDelete = async (row) => {
      const res = await messageDelete({ message: i18n.global.t('g.dialog.delete-message', { item: i18n.global.t('g.common.user') }) })
      if (!res) return
      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        onRefresh()
      }
    }
    const onResetPassword = async (row) => {
      const res = await messageConfirm({ title: i18n.global.t('user.dialog.reset-password.title'), message: i18n.global.t('user.dialog.reset-password.message') })
      if (!res) return
      const [resetPasswordRes] = await callResetPasswordFetch(row.id)
      if (resetPasswordRes) { await messageAlert({ title: i18n.global.t('user.dialog.reset-password-success.title'), message: `${i18n.global.t('user.dialog.reset-password-success.message')} ${resetPasswordRes.data.password}` }) }
    }

    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset, onRefresh } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'created_at', order: 'desc' }],
      sessionStorageKey: 'dashboardUserServerDataTable',
      callback: refreshFetch,
    })
    const { messageAlert, messageConfirm, messageDelete } = useMessageDialog()

    const { callCreateFetch: callResetPasswordFetch, callReadListFetch, callDeleteFetch } = useCRUD({
      createFetch: resetPasswordFetch,
      deleteFetch: delFetch,
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
      onDelete,
      onResetPassword,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

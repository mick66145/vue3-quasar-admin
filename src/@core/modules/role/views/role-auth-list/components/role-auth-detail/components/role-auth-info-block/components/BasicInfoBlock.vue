<template>
  <div class="p-2">
    <div class="row q-col-gutter-md">
      <div class="col-24">
        <q-card>
          <card-header>
            {{ $t('g.card.basic-info.title') }}
            <template #action>
              <add-button @click="onAdd" />
            </template>
          </card-header>
          <card-body class="q-pt-none">
            <vxe-client-table ref="dataTable" :data="sourceData.users">
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
                    <delete-icon-button @click="onDelete(row)" />
                  </div>
                </template>
              </vxe-column>
            </vxe-client-table>
          </card-body>
        </q-card>
      </div>
    </div>
    <user-dialog ref="dialog" @add="onAddUser" />
  </div>
</template>

<script>
import { UserDialog } from '@core/modules/user/components'
import { defineComponent, ref, reactive } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { i18n } from '@/plugins/i18n'
import useMessageDialog from '@/hooks/useMessageDialog'

export default defineComponent({
  components: {
    UserDialog,
  },
  props: {
    roleAuthFormData: { type: [String, Object], requred: true },
  },
  setup (props, { emit }) {
    // ref
    const dataTable = ref()
    const dialog = ref()

    // data
    const sourceData = useVModel(props, 'roleAuthFormData', emit)
    const tableFields = reactive([
      { title: 'g.common.account', field: 'account', min_width: '130' },
      { title: 'user.form.name', field: 'name', min_width: '130' },
      { title: 'g.common.email', field: 'email', min_width: '130' },
      { title: 'user.form.company', field: 'company.name', min_width: '130' },
    ])

    // methods
    const onAdd = () => {
      dialog.value.showDialog({})
    }
    const onDelete = async (row) => {
      const res = await messageDelete({ message: i18n.global.t('g.dialog.delete-message', { item: i18n.global.t('g.common.role-auth') }) })
      if (!res) return
      dataTable.value.remove(row)
      setSourceData()
    }
    const onAddUser = (value) => {
      dataTable.value.insertAtLast(value)
      setSourceData()
    }
    const setSourceData = () => {
      sourceData.value.users = dataTable.value.getFullData()
    }

    // use
    const { messageDelete } = useMessageDialog()

    return {
      dataTable,
      dialog,
      tableFields,
      sourceData,
      onAdd,
      onDelete,
      onAddUser,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

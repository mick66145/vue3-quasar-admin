<template>
  <div class="p-2">
    <div class="row q-col-gutter-md">
      <div class="col-24">
        <q-card>
          <card-header>
            {{ $t('g.card.basic-info.title') }}
            <template #action>
              <add-button @click="showDialog({ mode: 'create' })" />
            </template>
          </card-header>
          <card-body class="q-pt-none">
            <vxe-client-table ref="dataTable" :data="sourceData" :show-pagination="false">
              <vxe-column
                v-for="{ field, title, min_width } in tableFields"
                :key="field"
                :field="field"
                :title="`${$t(title)}`"
                :min-width="min_width"
              />
              <vxe-column :title="`${$t('g.common.operate')}`" fixed="right" width="115">
                <template #default="{ row, rowIndex }">
                  <div class="row">
                    <edit-icon-button
                      class="q-mr-xs q-mb-xs"
                      @click="showDialog({ data: { ...row, ...{ row_index: rowIndex } },mode: 'edit',})"
                    />
                    <delete-icon-button
                      class="q-mr-xs q-mb-xs"
                      @click="onDelete(row)"
                    />
                  </div>
                </template>
              </vxe-column>
            </vxe-client-table>
          </card-body>
        </q-card>
      </div>
    </div>
    <language-content-form-field-dialog ref="dialog" @confirm="onConfirmLanguageContentFormFieldDialog" />
  </div>
</template>

<script>
import LanguageContentFormFieldDialog from './language-content-form-field-dialog/LanguageContentFormFieldDialog.vue'
import { defineComponent, ref, reactive } from 'vue-demi'
import { LanguageContentFormFieldViewModel } from '@core/modules/language/models'
import { i18n } from '@/plugins/i18n'
import { useVModel } from '@vueuse/core'
import useMessageDialog from '@/hooks/useMessageDialog'

export default defineComponent({
  components: {
    LanguageContentFormFieldDialog,
  },
  props: {
    modelValue: { type: Array },
    mode: { type: String, requred: true },
  },
  setup (props, { emit }) {
    // ref
    const dataTable = ref()
    const dialog = ref()

    // data
    const sourceData = useVModel(props, 'modelValue', emit)
    const tableFields = reactive([
      { title: 'g.common.field-label', field: 'label', min_width: '130' },
    ])
    // methods
    const showDialog = async ({ data, mode }) => {
      dialog.value.showDialog({ data, mode })
    }
    const onConfirmLanguageContentFormFieldDialog = ({ data }) => {
      if (data.row_index !== null) {
        dataTable.value.updateRow(LanguageContentFormFieldViewModel({ ...data }), data.row_index)
      } else {
        dataTable.value.insertAtLast(LanguageContentFormFieldViewModel({ ...data }))
      }
      setSourceData()
    }
    const onDelete = async (row) => {
      const res = await messageDelete({ message: i18n.global.t('g.dialog.delete-message', { item: i18n.global.t('g.common.language-content-form-field') }) })
      if (!res) return
      dataTable.value.remove(row)
      setSourceData()
    }
    const setSourceData = () => {
      sourceData.value = dataTable.value.getFullData()
    }

    // use
    const { messageDelete } = useMessageDialog()

    return {
      dataTable,
      dialog,
      sourceData,
      tableFields,
      showDialog,
      onConfirmLanguageContentFormFieldDialog,
      onDelete,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

<template>
  <base-dialog v-model="isShowDialog" size="xl" :title="`${$t('language-content-form-field.detail.title')}`" @confirm="onConfirm" @hide="onHide">
    <base-form ref="form">
      <responsive-splitter>
        <template #before>
          <vertical-tabs v-model="currentBlock">
            <q-tab name="fieldSetting" :label="`${$t('g.card.field-setting.title')}`" />
            <q-tab name="fieldWidthSetting" :label="`${$t('g.card.field-width-setting.title')}`" />
          </vertical-tabs>
        </template>
        <template #after>
          <field-setting-block v-show="currentBlock === 'fieldSetting'" :language-content-form-field-form-data="data.state" />
          <field-width-setting-block v-show="currentBlock === 'fieldWidthSetting'" :language-content-form-field-form-data="data.state" />
        </template>
      </responsive-splitter>
    </base-form>
  </base-dialog>
</template>

<script>
import FieldSettingBlock from './components/FieldSettingBlock.vue'
import FieldWidthSettingBlock from './components/FieldWidthSettingBlock.vue'
import { defineComponent, ref } from 'vue-demi'
import { LanguageContentFormFieldViewModel } from '@core/modules/language/models'
import useDialog from '@/hooks/useDialog'

export default defineComponent({
  components: {
    FieldSettingBlock,
    FieldWidthSettingBlock,
  },
  emits: ['confirm'],
  setup (props, { emit }) {
    // ref
    const currentBlock = ref('fieldSetting')

    // methods
    const showDialog = ({ data }) => _showDialog({ data })
    const onConfirm = async () => {
      emit('confirm', { data: { ...data.state } })
      hideDialog()
    }
    const onHide = () => {
      data.reset()
    }

    // use
    const { form, data, isShowDialog, showDialog: _showDialog, hideDialog } = useDialog({
      formData: LanguageContentFormFieldViewModel(),
    })

    return {
      form,
      data,
      isShowDialog,
      currentBlock,
      showDialog,
      onConfirm,
      onHide,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

<template>
  <base-dialog
    v-model="isShowDialog"
    :title="`${$t('mail-log.detail.title')}`"
    :show-confirm="false"
    @confirm="onConfirm"
    @hide="onHide"
  >
    <span v-html="data.state.content" />
  </base-dialog>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { MailLogResource } from '@core/modules/mail-log/api'
import { MailLogViewModel } from '@core/modules/mail-log/models'
import useDialog from '@/hooks/useDialog'

const mailLogResource = MailLogResource({})

export default defineComponent({
  emits: ['confirm'],
  setup (props, { emit }) {
    // methods
    const readFetch = (id, query) => mailLogResource.get({ id, query })
    const onConfirm = async () => {
      const [res] = await save()
      if (res) emit('confirm')
    }
    const onHide = () => {
      data.reset()
    }

    // use
    const { form, data, isShowDialog, showDialog, save } = useDialog({
      formData: MailLogViewModel(),
      readFetch: readFetch,
    })

    return {
      form,
      data,
      isShowDialog,
      showDialog,
      onConfirm,
      onHide,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

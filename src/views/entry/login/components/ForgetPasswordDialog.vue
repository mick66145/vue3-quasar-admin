<template>
  <base-dialog v-model="isShowDialog" title="忘記密碼" confirm-button-text="送出" @confirm="onConfirm" @hide="onHide">
    <base-form ref="form">
      <div class="row">
        <div class="col-24">
          <q-item>
            <input-text
              v-model="data.state.account"
              class="full-width"
              :label="`${$t('g.common.account')} *`"
              :placeholder="$t('g.common.input', { field: $t('g.common.account') })"
              required
            />
          </q-item>
        </div>
        <div class="col-24">
          <q-item>
            <input-email
              v-model="data.state.email"
              class="full-width"
              :label="`${$t('g.common.email')} *`"
              :placeholder="$t('g.common.input', { field: $t('g.common.email') })"
              required
            />
          </q-item>
        </div>
      </div>
    </base-form>
  </base-dialog>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useUser } from '@/stores/user'
import useDialog from '@/hooks/useDialog'

export default defineComponent({
  emits: ['confirm'],
  setup (props, { emit }) {
    // data
    const store = useUser()

    // methods
    const createFetch = (payload) => store.forgetPassword(payload)
    const onConfirm = async () => {
      const [res] = await save()
      if (res) emit('confirm')
    }
    const onHide = () => {
      data.reset()
    }

    // use
    const { form, data, isShowDialog, showDialog, save } = useDialog({
      formData: {
        account: '',
        email: '',
      },
      createFetch: createFetch,
      createSuccess: '忘記密碼送出成功',
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

<style lang="postcss" scoped></style>

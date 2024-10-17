<template>
  <base-dialog v-model="isShowDialog" :title="$t('verify-code.detail.title')" @confirm="onConfirm" @hide="onHide">
    <base-form ref="form">
      <div class="row q-col-gutter-md text-wrap">
        <div v-if="mode==='view'" class="col-24">
          <base-form-item :label="`${$t('g.common.captcha')}`">
            {{ data.state.token }}
          </base-form-item>
        </div>
        <div v-if="mode==='view'" class="col-24">
          <base-form-item :label="`${$t('g.common.token')}`">
            {{ data.state.jwt_token }}
          </base-form-item>
        </div>
        <div class="col-24">
          <base-form-item :label="`${$t('g.common.type')} *`">
            <input-select
              v-if="mode!=='view'"
              v-model="data.state.type"
              class="full-width"
              :label="`${$t('g.common.type')}`"
              :placeholder="$t('g.common.select', { field: $t('g.common.type') })"
              emit-value
              option-label="label"
              option-value="value"
              :options="verifyCodeTypeList"
              :readonly="mode==='view'"
              required
            />
            <p v-else>{{ data.state.type_text }}</p>
          </base-form-item>
        </div>
        <div v-if="mode==='view'" class="col-24">
          <base-form-item :label="`${$t('g.common.account')}`">
            {{ data.state.account }}
          </base-form-item>
        </div>
        <div v-if="mode==='view'" class="col-24">
          <base-form-item :label="`${$t('g.common.phone')}`">
            {{ data.state.phone }}
          </base-form-item>
        </div>
        <div v-if="mode==='view'" class="col-24">
          <base-form-item :label="`${$t('g.common.email')}`">
            {{ data.state.email }}
          </base-form-item>
        </div>
        <div v-if="mode==='view'" class="col-24">
          <base-form-item :label="`${$t('g.common.sourceip')}`">
            {{ data.state.ip }}
          </base-form-item>
        </div>
      </div>
    </base-form>
  </base-dialog>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { VerifyCodeResource } from '@core/modules/verify-code/api'
import { VerifyCodeViewModel } from '@core/modules/verify-code/models'
import { verifyCodeTypeList } from '@core/modules/verify-code/config/config-verify-code'
import useDialog from '@/hooks/useDialog'

const verifyCodeResource = VerifyCodeResource({})

export default defineComponent({
  emits: ['confirm'],
  setup (props, { emit }) {
    const readFetch = (id, query) => verifyCodeResource.get({ id, query })
    const createFetch = (payload) => verifyCodeResource.post({ payload })
    const onConfirm = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const [res] = await save()
          if (res) emit('confirm')
        }
      })
    }
    const onHide = () => {
      data.reset()
    }

    // use
    const { form, data, isShowDialog, mode, showDialog, save } = useDialog({
      formData: VerifyCodeViewModel(),
      readFetch: readFetch,
      createFetch: createFetch,
    })

    return {
      form,
      data,
      isShowDialog,
      mode,
      verifyCodeTypeList,
      showDialog,
      onConfirm,
      onHide,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

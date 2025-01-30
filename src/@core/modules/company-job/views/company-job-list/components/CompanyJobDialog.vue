<template>
  <base-dialog v-model="isShowDialog" :title="`${$t('company-job.detail.title')}`" @confirm="onConfirm" @hide="onHide">
    <base-form ref="form">
      <div class="row">
        <div class="col-24">
          <base-form-item required :label="`${$t('company-job.form.name')}`">
            <input-text
              v-model="data.state.name"
              class="full-width"
              :label="`${$t('company-job.form.name')}`"
              :placeholder="$t('g.common.input', { field: $t('company-job.form.name') })"
              required
            />
          </base-form-item>
        </div>
      </div>
    </base-form>
  </base-dialog>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { CompanyJobResource } from '@core/modules/company-job/api'
import { CompanyJobViewModel } from '@core/modules/company-job/models'
import useDialog from '@/hooks/useDialog'

const companyJobResource = CompanyJobResource({})

export default defineComponent({
  emits: ['confirm'],
  setup (props, { emit }) {
    // methods
    const readFetch = (id, query) => companyJobResource.get({ id, query })
    const createFetch = (payload) => companyJobResource.post({ payload })
    const updateFetch = (id, payload) => companyJobResource.patch({ id, payload })

    const onConfirm = async () => {
      const [res] = await save()
      if (res) emit('confirm')
    }
    const onHide = () => {
      data.reset()
    }

    // use
    const { form, data, isShowDialog, showDialog, save } = useDialog({
      formData: CompanyJobViewModel(),
      readFetch: readFetch,
      createFetch: createFetch,
      updateFetch: updateFetch,
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

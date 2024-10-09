<template>
  <base-dialog v-model="isShowDialog" title="前台選單詳情 : " @confirm="onConfirm" @hide="onHide">
    <base-form ref="form" label-position="left">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <base-form-item :label="`${$t('frontend-menu.form.name')} *`">
            <input-text
              v-model="data.state.name"
              class="full-width"
              :label="`${$t('frontend-menu.form.name')}`"
              :placeholder="$t('g.common.input', { field: $t('frontend-menu.form.name') })"
              required
            />
          </base-form-item>
        </div>
        <div class="col-12">
          <base-form-item :label="`${$t('frontend-menu.form.parent')}`">
            <input-frontend-menu-select
              v-model="data.state.parent"
              class="full-width"
              :label="`${$t('frontend-menu.form.parent')}`"
              :placeholder="$t('g.common.select', { field: $t('frontend-menu.form.parent') })"
            />
          </base-form-item>
        </div>
        <div class="col-12">
          <base-form-item :label="`${$t('g.common.type')} *`">
            <input-select
              v-model="data.state.type"
              class="full-width"
              :label="`${$t('g.common.type')}`"
              :placeholder="$t('g.common.select', { field: $t('g.common.type') })"
              emit-value
              option-label="label"
              option-value="value"
              :options="frontendMenuTypeList"
              required
            />
          </base-form-item>
        </div>
        <div v-if="data.state.type==='link' || data.state.type==='internal_link'" class="col-12">
          <base-form-item :label="`${$t('g.common.link')}`">
            <input-text
              v-model="data.state.link"
              class="full-width"
              :label="`${$t('g.common.link')}`"
              :placeholder="$t('g.common.input', { field: $t('g.common.link') })"
            />
          </base-form-item>
        </div>
        <div class="col-12">
          <base-form-item :label="`${$t('g.common.sequence')}`">
            <input-number
              v-model="data.state.sequence"
              class="full-width"
              :label="`${$t('g.common.sequence')}`"
              :placeholder="$t('g.common.input', { field: $t('g.common.sequence') })"
            />
          </base-form-item>
        </div>
        <div v-if="data.state.type==='link'" class="col-12">
          <base-form-item :label="`${$t('g.common.open-blank')}`">
            <input-checkbox v-model="data.state.is_link_blank" />
          </base-form-item>
        </div>
        <div class="col-12">
          <base-form-item :label="`${$t('g.common.enable')}`">
            <input-checkbox v-model="data.state.is_enable" />
          </base-form-item>
        </div>
      </div>
    </base-form>
  </base-dialog>
</template>

<script>
import { InputFrontendMenuSelect } from '@core/modules/frontend-menu/components'
import { defineComponent } from 'vue-demi'
import { FrontendMenuResource } from '@core/modules/frontend-menu/api'
import { FrontendMenuViewModel } from '@core/modules/frontend-menu/models'
import { frontendMenuTypeList } from '@core/modules/frontend-menu/config/config-frontend-menu'
import useDialog from '@/hooks/useDialog'

const frontendMenuResource = FrontendMenuResource({})

export default defineComponent({
  components: {
    InputFrontendMenuSelect,
  },
  emits: ['confirm'],
  setup (props, { emit }) {
    const readFetch = (id, query) => frontendMenuResource.get({ id, query })
    const createFetch = (payload) => frontendMenuResource.post({ payload })
    const updateFetch = (id, payload) => frontendMenuResource.patch({ id, payload })
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
    const { form, data, isShowDialog, showDialog, save } = useDialog({
      formData: FrontendMenuViewModel(),
      readFetch: readFetch,
      createFetch: createFetch,
      updateFetch: updateFetch,
    })

    return {
      form,
      data,
      isShowDialog,
      frontendMenuTypeList,
      showDialog,
      onConfirm,
      onHide,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

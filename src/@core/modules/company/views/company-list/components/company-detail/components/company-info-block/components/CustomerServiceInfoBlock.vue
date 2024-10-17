<template>
  <div class="p-2">
    <div class="row q-col-gutter-md">
      <div class="col-24">
        <q-card>
          <card-header>
            {{ $t('company.detail.card.customer-service-info.title') }}
          </card-header>
          <card-body class="q-pt-none">
            <div class="row q-col-gutter-md">
              <div class="col-24">
                <base-form-item :label="`${$t('company.form.customer-service-hotline')}`">
                  <input-tel
                    v-model="sourceData.tel_service"
                    class="full-width"
                    :label="`${$t('company.form.customer-service-hotline')}`"
                    :placeholder="$t('g.common.input', { field: $t('company.form.customer-service-hotline') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('company.form.customer-service-hours')}`">
                  <input-text
                    v-model="sourceData.service_time"
                    class="full-width"
                    :label="`${$t('company.form.customer-service-hours')}`"
                    :placeholder="$t('g.common.input', { field: $t('company.form.customer-service-hours') })"
                  />
                </base-form-item>
              </div>
            </div>
          </card-body>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'
export default defineComponent({
  props: {
    companyFormData: { type: [String, Object], requred: true },
    mode: { type: String, requred: true },
  },
  setup (props, { emit }) {
    // data
    const sourceData = useVModel(props, 'companyFormData', emit)
    return {
      sourceData,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

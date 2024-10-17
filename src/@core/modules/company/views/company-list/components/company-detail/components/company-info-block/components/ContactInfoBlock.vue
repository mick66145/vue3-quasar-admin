<template>
  <div class="p-2">
    <div class="row q-col-gutter-md">
      <div class="col-24">
        <q-card>
          <card-header>
            {{ $t('company.detail.card.contact-info.title') }}
          </card-header>
          <card-body class="q-pt-none">
            <div class="row q-col-gutter-md">
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.tel')}`">
                  <input-tel
                    v-model="sourceData.tel"
                    class="full-width"
                    :label="`${$t('g.common.tel')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.tel') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.extension-number')}`">
                  <input-text
                    v-model="sourceData.tel_ext"
                    class="full-width"
                    :label="`${$t('g.common.extension-number')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.extension-number') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.fax')}`">
                  <input-text
                    v-model="sourceData.fax"
                    class="full-width"
                    :label="`${$t('g.common.fax')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.fax') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.phone')}`">
                  <input-text
                    v-model="sourceData.phone"
                    class="full-width"
                    :label="`${$t('g.common.phone')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.phone') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.email')}`">
                  <input-email
                    v-model="sourceData.email"
                    class="full-width"
                    :label="`${$t('g.common.email')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.email') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.address')}`">
                  <input-address v-model="sourceData.address_obj" showPostCode />
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

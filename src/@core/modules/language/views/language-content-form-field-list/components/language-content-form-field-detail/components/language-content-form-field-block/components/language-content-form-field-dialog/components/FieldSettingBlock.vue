<template>
  <div class="p-2">
    <div class="row q-col-gutter-md">
      <div class="col-24">
        <q-card>
          <card-header>
            {{ $t('g.card.field-setting.title') }}
          </card-header>
          <card-body class="q-pt-none">
            <div class="row q-col-gutter-md">
              <div class="col-24">
                <base-form-item required :label="`${$t('g.common.field-label')}`">
                  <input-text
                    v-model="sourceData.label"
                    class="full-width"
                    :label="`${$t('g.common.field-label')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.field-label') })"
                    required
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.component')}`">
                  <input-text
                    v-model="sourceData.component"
                    class="full-width"
                    :label="`${$t('g.common.component')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.component') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item required :label="`${$t('g.common.data-key')}`">
                  <input-text
                    v-model="sourceData.data_key"
                    class="full-width"
                    :label="`${$t('g.common.data-key')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.data-key') })"
                    required
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.i18n-key')}`">
                  <input-text
                    v-model="sourceData.i18n_key"
                    class="full-width"
                    :label="`${$t('g.common.i18n-key')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.i18n-key') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.placeholder')}`">
                  <input-text
                    v-model="sourceData.placeholder"
                    class="full-width"
                    :label="`${$t('g.common.placeholder')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.placeholder') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.sequence')}`">
                  <input-number
                    v-model="sourceData.sequence"
                    class="full-width"
                    :label="`${$t('g.common.sequence')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.sequence') })"
                  />
                </base-form-item>
              </div>
              <div class="col-8 col-sm-6 col-md-4 col-lg-2">
                <input-checkbox
                  v-model="sourceData.required"
                  class="full-width"
                  :label="`${$t('g.common.required')}`"
                  :placeholder="$t('g.common.input', { field: $t('g.common.required') })"
                />
              </div>
              <div class="col-8 col-sm-6 col-md-4 col-lg-2">
                <input-checkbox
                  v-model="sourceData.disable"
                  class="full-width"
                  :label="`${$t('g.common.disable')}`"
                  :placeholder="$t('g.common.input', { field: $t('g.common.disable') })"
                />
              </div>
              <div class="col-8 col-sm-6 col-md-4 col-lg-2">
                <input-checkbox
                  v-model="sourceData.readonly"
                  class="full-width"
                  :label="`${$t('g.common.readonly')}`"
                  :placeholder="$t('g.common.input', { field: $t('g.common.readonly') })"
                />
              </div>
              <div class="col-8 col-sm-6 col-md-4 col-lg-2">
                <input-checkbox
                  v-model="sourceData.is_show"
                  class="full-width"
                  :label="`${$t('g.common.is-show')}`"
                  :placeholder="$t('g.common.input', { field: $t('g.common.is-show') })"
                />
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
    languageContentFormFieldFormData: { type: [String, Object], requred: true },
    mode: { type: String, requred: true },
  },
  setup (props, { emit }) {
    // data
    const sourceData = useVModel(props, 'languageContentFormFieldFormData', emit)
    return {
      sourceData,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

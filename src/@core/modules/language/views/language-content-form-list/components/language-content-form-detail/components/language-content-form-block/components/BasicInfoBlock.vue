<template>
  <div class="p-2">
    <div class="row q-col-gutter-md">
      <div class="col-24">
        <q-card>
          <card-header>
            {{ $t('g.card.basic-info.title') }}
          </card-header>
          <card-body class="q-pt-none">
            <div class="row q-col-gutter-md">
              <div class="col-24">
                <base-form-item :label="`${$t('language-content-form.form.name')} *`">
                  <input-text
                    v-model="sourceData.name"
                    class="full-width"
                    :label="`${$t('language-content-form.form.name')}`"
                    :placeholder="$t('g.common.input', { field: $t('language-content-form.form.name') })"
                    required
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.usage-type')} *`">
                  <input-text
                    v-model="sourceData.usage_type"
                    class="full-width"
                    :label="`${$t('g.common.usage-type')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.usage-type') })"
                    required
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
    languageContentFormFormData: { type: [String, Object], requred: true },
    mode: { type: String, requred: true },
  },
  setup (props, { emit }) {
    // data
    const sourceData = useVModel(props, 'languageContentFormFormData', emit)
    return {
      sourceData,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

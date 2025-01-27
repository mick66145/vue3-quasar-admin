<template>
  <div class="p-2">
    <div class="row q-col-gutter-md">
      <div class="col-24">
        <q-card>
          <card-header>
            {{ $t('g.card.field-width-setting.title') }}
          </card-header>
          <card-body class="q-pt-none">
            <div class="row q-col-gutter-md">
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.layout-xs')}`">
                  <input-number
                    v-model="sourceData.layout.xs"
                    class="full-width"
                    :label="`${$t('g.common.field-label')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.field-label') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.layout-sm')}`">
                  <input-number
                    v-model="sourceData.layout.sm"
                    class="full-width"
                    :label="`${$t('g.common.layout-sm')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.layout-sm') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.layout-md')}`">
                  <input-number
                    v-model="sourceData.layout.md"
                    class="full-width"
                    :label="`${$t('g.common.layout-md')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.layout-md') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.layout-lg')}`">
                  <input-number
                    v-model="sourceData.layout.lg"
                    class="full-width"
                    :label="`${$t('g.common.layout-lg')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.layout-lg') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.layout-xl')}`">
                  <input-number
                    v-model="sourceData.layout.xl"
                    class="full-width"
                    :label="`${$t('g.common.layout-xl')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.layout-xl') })"
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

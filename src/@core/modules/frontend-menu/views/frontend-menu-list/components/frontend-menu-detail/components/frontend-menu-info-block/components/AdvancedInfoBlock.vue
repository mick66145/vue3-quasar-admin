<template>
  <div class="p-2">
    <div class="row q-col-gutter-md">
      <div class="col-24">
        <q-card>
          <card-header>
            {{ $t('g.card.advanced-info.title') }}
          </card-header>
          <card-body class="q-pt-none">
            <div class="row q-col-gutter-y-md">
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.enable')}`">
                  <input-true-false-select
                    v-model="sourceData.is_enable"
                    class="full-width"
                    :label="`${$t('g.common.enable')}`"
                    :placeholder="$t('g.common.select', { field: $t('g.common.enable') })"
                  />
                </base-form-item>
              </div>
              <div v-if="sourceData.type==='link'" class="col-24">
                <base-form-item :label="`${$t('g.common.open-blank')}`">
                  <input-true-false-select
                    v-model="sourceData.is_link_blank"
                    class="full-width"
                    :label="`${$t('g.common.open-blank')}`"
                    :placeholder="$t('g.common.select', { field: $t('g.common.open-blank') })"
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
    frontendMenuFormData: { type: [String, Object], requred: true },
  },
  setup (props, { emit }) {
    // data
    const sourceData = useVModel(props, 'frontendMenuFormData', emit)
    return {
      sourceData,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

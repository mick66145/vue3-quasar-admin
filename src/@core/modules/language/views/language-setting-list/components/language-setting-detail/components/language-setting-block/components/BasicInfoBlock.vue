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
                <base-form-item required :label="`${$t('language-setting.form.name')}`">
                  <input-text
                    v-model="sourceData.name"
                    class="full-width"
                    :label="`${$t('language-setting.form.name')}`"
                    :placeholder="$t('g.common.input', { field: $t('language-setting.form.name') })"
                    required
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item required :label="`${$t('g.common.locale')}`">
                  <input-text
                    v-model="sourceData.locale"
                    class="full-width"
                    :label="`${$t('g.common.locale')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.locale') })"
                    required
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
    languageSettingFormData: { type: [String, Object], requred: true },
    mode: { type: String, requred: true },
  },
  setup (props, { emit }) {
    // data
    const sourceData = useVModel(props, 'languageSettingFormData', emit)
    return {
      sourceData,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

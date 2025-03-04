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
                <base-form-item required :label="`${$t('frontend-menu.form.name')}`">
                  <input-text
                    v-model="sourceData.name"
                    class="full-width"
                    :label="`${$t('frontend-menu.form.name')}`"
                    :placeholder="$t('g.common.input', { field: $t('frontend-menu.form.name') })"
                    required
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item required :label="`${$t('g.common.type')}`">
                  <input-select
                    v-model="sourceData.type"
                    class="full-width"
                    :label="`${$t('g.common.type')}`"
                    :placeholder="$t('g.common.select', { field: $t('g.common.type') })"
                    :options="frontendMenuTypeList"
                    option-label="label"
                    option-value="value"
                    required
                    emit-value
                  />
                </base-form-item>
              </div>
              <div v-if="mode==='edit'" class="col-24">
                <base-form-item :label="`${$t('frontend-menu.form.parent')}`">
                  <input-frontend-menu-select
                    v-model="sourceData.parent"
                    class="full-width"
                    type="dropdown"
                    :label="`${$t('frontend-menu.form.parent')}`"
                    :placeholder="$t('g.common.select', { field: $t('frontend-menu.form.parent') })"
                  />
                </base-form-item>
              </div>
              <div v-if="sourceData.type === frontendMenuTypes.link || sourceData.type === frontendMenuTypes.internal_link" class="col-24">
                <base-form-item :label="`${$t('g.common.link')}`">
                  <input-text
                    v-model="sourceData.link"
                    class="full-width"
                    :label="`${$t('g.common.link')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.link') })"
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
import { frontendMenuTypes, frontendMenuTypeList } from '@core/modules/frontend-menu/config/config-frontend-menu'

export default defineComponent({
  props: {
    frontendMenuFormData: { type: [String, Object], requred: true },
    mode: { type: String, requred: true },
  },
  setup (props, { emit }) {
    // data
    const sourceData = useVModel(props, 'frontendMenuFormData', emit)
    return {
      sourceData,
      frontendMenuTypes,
      frontendMenuTypeList,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

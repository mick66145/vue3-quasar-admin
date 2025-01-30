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
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.data-access-role')}`">
                  <input-data-access-role-select v-model="sourceData.data_access_roles" class="full-width" />
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
    userFormData: { type: [String, Object], requred: true },
  },
  setup (props, { emit }) {
    // data
    const sourceData = useVModel(props, 'userFormData', emit)
    return {
      sourceData,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

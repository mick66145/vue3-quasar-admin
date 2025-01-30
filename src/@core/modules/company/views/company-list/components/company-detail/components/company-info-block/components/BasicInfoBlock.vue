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
                <base-form-item required :label="`${$t('company.form.name')}`">
                  <input-text
                    v-model="sourceData.name"
                    required
                    class="full-width"
                    name="name"
                    :label="`${$t('company.form.name')}`"
                    :placeholder="$t('g.common.input', { field: $t('company.form.name') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('company.form.invoice')}`">
                  <input-text
                    v-model="sourceData.invoice"
                    class="full-width"
                    :label="`${$t('company.form.invoice')}`"
                    :placeholder="$t('g.common.input', { field: $t('company.form.invoice') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.uniform-number')}`">
                  <input-tw-uniform-number
                    v-model="sourceData.vatnumber"
                    class="full-width"
                    :label="`${$t('g.common.uniform-number')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.uniform-number') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('company.form.leader')}`">
                  <input-text
                    v-model="sourceData.ceo"
                    class="full-width"
                    :label="`${$t('company.form.leader')}`"
                    :placeholder="$t('g.common.input', { field: $t('company.form.leader') })"
                  />
                </base-form-item>
              </div>

              <div class="col-24">
                <base-form-item :label="`${$t('company.form.established')}`">
                  <input-date
                    v-model="sourceData.opendate"
                    class="full-width"
                    :label="`${$t('company.form.established')}`"
                    :placeholder="$t('g.common.select', { field: $t('company.form.established') })"
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

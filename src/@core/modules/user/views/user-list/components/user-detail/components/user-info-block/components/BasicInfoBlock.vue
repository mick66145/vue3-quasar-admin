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
                <base-form-item required :label="`${$t('g.common.account')}`">
                  <input-text
                    v-model="sourceData.account"
                    class="full-width"
                    :label="`${$t('g.common.account')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.account') })"
                    required
                    :readonly="mode === 'edit'"
                  />
                </base-form-item>
              </div>
              <div v-if="mode === 'create'" class="col-24">
                <base-form-item required :label="`${$t('g.common.password')}`">
                  <input-password
                    v-model="sourceData.password"
                    class="full-width"
                    :label="`${$t('g.common.password')}`"
                    autocomplete="new-password"
                    :placeholder="$t('g.common.input', { field: $t('g.common.password') })"
                    required
                    :rules="[
                      $rules.regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)(?!.* ).{8,}$/i, $t('g.validation.password'))
                    ]"
                  >
                    <template #hint>
                      {{ $t('g.validation.password') }}
                    </template>
                  </input-password>
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item required :label="`${$t('user.form.name')}`">
                  <input-text
                    v-model="sourceData.name"
                    class="full-width"
                    :label="`${$t('user.form.name')}`"
                    :placeholder="$t('g.common.input', { field: $t('user.form.name') })"
                    required
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item required :label="`${$t('g.common.role')}`">
                  <input-role-select v-model="sourceData.role" class="full-width" required />
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
                <base-form-item :label="`${$t('g.common.company')}`">
                  <input-company-select v-model="sourceData.company" class="full-width" />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.company-job')}`">
                  <input-company-job-select v-model="sourceData.company_job" class="full-width" />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('g.common.remark')}`">
                  <input-textarea
                    v-model="sourceData.remark"
                    class="full-width"
                    :label="`${$t('g.common.remark')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.remark') })"
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
    userFormData: { type: [String, Object], requred: true },
    mode: { type: String, requred: true },
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

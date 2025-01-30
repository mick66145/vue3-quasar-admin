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
                <base-form-item required :label="`${$t('mailinfo.form.subject')}`">
                  <input-text
                    v-model="sourceData.subject"
                    name="subject"
                    class="full-width"
                    :label="`${$t('mailinfo.form.subject')}`"
                    :placeholder="$t('g.common.input', { field: $t('mailinfo.form.subject') })"
                    required
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('mailinfo.form.fromname')}`">
                  <input-text
                    v-model="sourceData.fromname"
                    class="full-width"
                    :label="`${$t('mailinfo.form.fromname')}`"
                    :placeholder="$t('g.common.input', { field: $t('mailinfo.form.fromname') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('mailinfo.form.repeatname')}`">
                  <input-text
                    v-model="sourceData.repeatname"
                    class="full-width"
                    :label="`${$t('mailinfo.form.repeatname')}`"
                    :placeholder="$t('g.common.input', { field: $t('mailinfo.form.repeatname') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('mailinfo.form.repeatmail')}`">
                  <input-email
                    v-model="sourceData.repeatmail"
                    class="full-width"
                    :label="`${$t('mailinfo.form.repeatmail')}`"
                    :placeholder="$t('g.common.input', { field: $t('mailinfo.form.repeatmail') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item required :label="`${$t('mailinfo.form.tomail')}`">
                  <input-textarea
                    v-model="sourceData.tomail"
                    class="full-width"
                    :label="`${$t('mailinfo.form.tomail')}`"
                    :placeholder="$t('g.common.input', { field: $t('mailinfo.form.tomail') })"
                    required
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('mailinfo.form.cc')}`">
                  <input-textarea
                    v-model="sourceData.cc"
                    class="full-width"
                    :label="`${$t('mailinfo.form.cc')}`"
                    :placeholder="$t('g.common.input', { field: $t('mailinfo.form.cc') })"
                  />
                </base-form-item>
              </div>
              <div class="col-24">
                <base-form-item :label="`${$t('mailinfo.form.bcc')}`">
                  <input-textarea
                    v-model="sourceData.bcc"
                    class="full-width"
                    :label="`${$t('mailinfo.form.bcc')}`"
                    :placeholder="$t('g.common.input', { field: $t('mailinfo.form.bcc') })"
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
    mailinfoFormData: { type: [String, Object], requred: true },
    mode: { type: String, requred: true },
  },
  setup (props, { emit }) {
    // data
    const sourceData = useVModel(props, 'mailinfoFormData', emit)
    return {
      sourceData,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

<template>
  <padding-page>
    <page-header showPrev showCancel showConfirm @confirm="onSubmit">
      {{ $t('mailinfo.detail.title') }}
    </page-header>
    <base-tabs v-model="currentCard" class="q-mb-md">
      <q-tab name="mailInfo" :label="`${$t('mailinfo.detail.card.mail-info.title')}`" />
      <q-tab name="mailContent" :label="`${$t('mailinfo.detail.card.mail-content.title')}`" />
    </base-tabs>
    <base-form ref="form">
      <div class="row q-col-gutter-md">
        <div v-show="currentCard === 'mailInfo'" class="col-12">
          <q-card>
            <card-header>
              {{ $t('mailinfo.detail.card.mail-info.title') }}
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('mailinfo.form.subject')} *`">
                    <input-text
                      v-model="formData.subject"
                      class="full-width"
                      :label="`${$t('mailinfo.form.subject')}`"
                      :placeholder="$t('g.common.input', { field: $t('mailinfo.form.subject') })"
                      required
                    />
                  </base-form-item>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('mailinfo.form.fromname')}`">
                    <input-text
                      v-model="formData.fromname"
                      class="full-width"
                      :label="`${$t('mailinfo.form.fromname')}`"
                      :placeholder="$t('g.common.input', { field: $t('mailinfo.form.fromname') })"
                    />
                  </base-form-item>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('mailinfo.form.repeatname')}`">
                    <input-text
                      v-model="formData.repeatname"
                      class="full-width"
                      :label="`${$t('mailinfo.form.repeatname')}`"
                      :placeholder="$t('g.common.input', { field: $t('mailinfo.form.repeatname') })"
                    />
                  </base-form-item>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('mailinfo.form.repeatmail')}`">
                    <input-email
                      v-model="formData.repeatmail"
                      class="full-width"
                      :label="`${$t('mailinfo.form.repeatmail')}`"
                      :placeholder="$t('g.common.input', { field: $t('mailinfo.form.repeatmail') })"
                    />
                  </base-form-item>
                </div>
                <div class="col-12">
                  <base-form-item :label="`${$t('mailinfo.form.tomail')} *`">
                    <input-textarea
                      v-model="formData.tomail"
                      class="full-width"
                      :label="`${$t('mailinfo.form.tomail')}`"
                      :placeholder="$t('g.common.input', { field: $t('mailinfo.form.tomail') })"
                      required
                    />
                  </base-form-item>
                </div>
                <div class="col-12">
                  <base-form-item :label="`${$t('mailinfo.form.cc')}`">
                    <input-textarea
                      v-model="formData.cc"
                      class="full-width"
                      :label="`${$t('mailinfo.form.cc')}`"
                      :placeholder="$t('g.common.input', { field: $t('mailinfo.form.cc') })"
                    />
                  </base-form-item>
                </div>
                <div class="col-12">
                  <base-form-item :label="`${$t('mailinfo.form.bcc')}`">
                    <input-textarea
                      v-model="formData.bcc"
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
        <div v-show="currentCard === 'mailContent'" class="col-12">
          <q-card>
            <card-header>
              {{ $t('mailinfo.detail.card.mail-content.title') }}
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <input-editor v-model="formData.content_json" class="full-width" />
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
      </div>
    </base-form>
    <fixed-footer @confirm="onSubmit" />
  </padding-page>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted } from 'vue-demi'
import { useRoute } from 'vue-router'
import { MailinfoResource } from '@core/modules/mailinfo/api'
import { MailinfoViewModel } from '@core/modules/mailinfo/models'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'
import useDeltaConvert from '@/hooks/useDeltaConvert'

const mailinfoResource = MailinfoResource({})

export default defineComponent({
  components: {
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const { mode } = toRefs(props)
    const currentCard = ref('mailInfo')
    const route = useRoute()
    const formData = ref(MailinfoViewModel())
    const id = route.params.id || null

    // mounted
    onMounted(async () => {
      if (id) {
        const [res] = await callReadFetch(id)
        formData.value = res
      }
    })

    // methods
    const readFetch = (id, query) => mailinfoResource.get({ id, query })
    const createFetch = (payload) => mailinfoResource.post({ payload })
    const updateFetch = (id, payload) => mailinfoResource.patch({ id, payload })
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData.value }
          payload.content = payload.content_json ? renderHtml(payload.content_json?.ops || []) : ''
          payload.content_json = JSON.stringify(payload.content_json)
          const urlObj = {
            create: () => callCreateFetch({ ...payload }),
            edit: () => callUpdateFetch(id, { ...payload }),
          }
          const [res, error] = mode.value === 'create' ? await urlObj.create() : await urlObj.edit()
          if (res) goBack()
        }
      })
    }

    // use
    const { goBack } = useGoBack()
    const { form, callReadFetch, callCreateFetch, callUpdateFetch } = useCRUD({
      readFetch: readFetch,
      createFetch: createFetch,
      updateFetch: updateFetch,
    })
    const { renderHtml } = useDeltaConvert()

    return {
      form,
      formData,
      currentCard,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

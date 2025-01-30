<template>
  <base-page>
    <page-header showPrev showCancel showConfirm @confirm="onSubmit">
      {{ $t('language-data.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="languageDataInfo" :label="`${$t('language-data.detail.card.language-data-info.title')}`" />
      <q-tab name="fieldeSetting" :label="`${$t('language-data.detail.card.field-setting.title')}`" />
      <q-tab name="fieldWidthSetting" :label="`${$t('language-data.detail.card.field-width-setting.title')}`" />
    </base-tabs>
    <base-form ref="form">
      <div class="row q-col-gutter-md">
        <div v-show="currentBlock === 'languageDataInfo'" class="col-24">
          <q-card>
            <card-header>
              {{ $t('language-data.detail.card.language-data-info.title') }}
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-md">
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.field-label')} *`">
                    <input-text
                      v-model="formData.label"
                      class="full-width"
                      :label="`${$t('g.common.field-label')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.field-label') })"
                      required
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.data-key')} *`">
                    <input-text
                      v-model="formData.data_key"
                      class="full-width"
                      :label="`${$t('g.common.data-key')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.data-key') })"
                      required
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.i18n-key')} *`">
                    <input-text
                      v-model="formData.i18n_key"
                      class="full-width"
                      :label="`${$t('g.common.i18n-key')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.i18n-key') })"
                      required
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.placeholder')}`">
                    <input-text
                      v-model="formData.placeholder"
                      class="full-width"
                      :label="`${$t('g.common.placeholder')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.placeholder') })"
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.locale')} *`">
                    <input-text
                      v-model="formData.locale"
                      class="full-width"
                      :label="`${$t('g.common.locale')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.locale') })"
                      required
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.sequence')}`">
                    <input-number
                      v-model="formData.sequence"
                      class="full-width"
                      :label="`${$t('g.common.sequence')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.sequence') })"
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.value')}`">
                    <component
                      :is="formData.component"
                      v-model="formData.value"
                      :label="observeLabel"
                      :placeholder="observePlaceholder"
                    />
                  </base-form-item>
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
        <div v-show="currentBlock === 'fieldeSetting'" class="col-24">
          <q-card>
            <card-header>
              {{ $t('language-data.detail.card.field-setting.title') }}
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-xs">
                <div class="col-24">
                  <input-checkbox
                    v-model="formData.required"
                    class="full-width"
                    :label="`${$t('g.common.required')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.required') })"
                  />
                </div>
                <div class="col-24">
                  <input-checkbox
                    v-model="formData.disable"
                    class="full-width"
                    :label="`${$t('g.common.disable')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.disable') })"
                  />
                </div>
                <div class="col-24">
                  <input-checkbox
                    v-model="formData.readonly"
                    class="full-width"
                    :label="`${$t('g.common.readonly')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.readonly') })"
                  />
                </div>
                <div class="col-24">
                  <input-checkbox
                    v-model="formData.is_show"
                    class="full-width"
                    :label="`${$t('g.common.is-show')}`"
                    :placeholder="$t('g.common.input', { field: $t('g.common.is-show') })"
                  />
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
        <div v-show="currentBlock === 'fieldWidthSetting'" class="col-24">
          <q-card>
            <card-header>
              {{ $t('language-data.detail.card.field-width-setting.title') }}
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-md">
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.layout-xs')}`">
                    <input-number
                      v-model="formData.layout.xs"
                      class="full-width"
                      :label="`${$t('g.common.field-label')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.field-label') })"
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.layout-sm')}`">
                    <input-number
                      v-model="formData.layout.sm"
                      class="full-width"
                      :label="`${$t('g.common.layout-sm')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.layout-sm') })"
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.layout-md')}`">
                    <input-number
                      v-model="formData.layout.md"
                      class="full-width"
                      :label="`${$t('g.common.layout-md')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.layout-md') })"
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.layout-lg')}`">
                    <input-number
                      v-model="formData.layout.lg"
                      class="full-width"
                      :label="`${$t('g.common.layout-lg')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.layout-lg') })"
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.layout-xl')}`">
                    <input-number
                      v-model="formData.layout.xl"
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
    </base-form>
    <fixed-footer go-back-route="/language-data" @confirm="onSubmit" />
  </base-page>
</template>

<script>
import { defineComponent, ref, computed, toRefs, onMounted } from 'vue-demi'
import { LanguageDataResource } from '@core/modules/language/api'
import { LanguageDataViewModel } from '@core/modules/language/models'
import { useRoute } from 'vue-router'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

const languageDataResource = LanguageDataResource({})

export default defineComponent({
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const { mode } = toRefs(props)
    const route = useRoute()
    const formData = ref(LanguageDataViewModel())
    const fallBack = { name: 'LanguageDataList' }
    const currentBlock = ref('languageDataInfo')
    const id = route.params.id || null

    // computed
    const observeLabel = computed(() => {
      return formData.value.i18n_key ? i18n.global.t(formData.value.i18n_key) : formData.value.label
    })
    const observePlaceholder = computed(() => {
      return formData.value.i18n_key ? i18n.global.t('g.common.input', { field: i18n.global.t(formData.value.i18n_key) }) : formData.value.placeholder
    })

    // mounted
    onMounted(async () => {
      if (id) {
        const [res] = await callReadFetch(id)
        formData.value = res
      }
    })

    // methods
    const readFetch = (id, query) => languageDataResource.get({ id, query })
    const createFetch = (payload) => languageDataResource.post({ payload })
    const updateFetch = (id, payload) => languageDataResource.patch({ id, payload })
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData.value }
          const urlObj = {
            create: () => callCreateFetch({ ...payload }),
            edit: () => callUpdateFetch(id, { ...payload }),
          }
          const [res] = mode.value === 'create' ? await urlObj.create() : await urlObj.edit()
          if (res) goBack()
        }
      })
    }

    // use
    const { goBack } = useGoBack({ fallBack })
    const { form, callReadFetch, callCreateFetch, callUpdateFetch } = useCRUD({
      readFetch: readFetch,
      createFetch: createFetch,
      updateFetch: updateFetch,
    })

    return {
      form,
      formData,
      currentBlock,
      observeLabel,
      observePlaceholder,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

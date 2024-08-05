<template>
  <base-page>
    <page-header showPrev showCancel showConfirm @confirm="onSubmit">
      {{ $t('language-setting.detail.title') }}
    </page-header>
    <base-tabs class="q-mb-md" v-model="currentCard">
      <q-tab name="accountInfo" :label="`${$t('language-setting.detail.card.language-setting.title')}`"/>
    </base-tabs>
    <q-card>
      <card-header>
        {{ $t('language-setting.detail.card.language-setting.title') }}
      </card-header>
      <card-body class="q-pt-none">
        <base-form ref="form">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <base-form-item :label="`${$t('language-setting.form.name')} *`">
                <input-text v-model="formData.name" class="full-width" :label="`${$t('language-setting.form.name')}`"
                  :placeholder="$t('g.common.input', { field: $t('language-setting.form.name') })" required />
              </base-form-item>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <base-form-item :label="`${$t('g.form.locale')} *`">
                <input-text v-model="formData.locale" class="full-width" :label="`${$t('g.form.locale')}`"
                :placeholder="$t('g.common.input', { field: $t('g.form.locale') })" required />
              </base-form-item>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <base-form-item :label="`${$t('g.form.sequence')}`">
                <input-number v-model="formData.sequence" class="full-width" :label="`${$t('g.form.sequence')}`"
                  :placeholder="$t('g.common.input', { field: $t('g.form.sequence') })" />
              </base-form-item>
            </div>
          </div>
        </base-form>
      </card-body>
    </q-card>
    <fixed-footer go-back-route="/language-setting" @confirm="onSubmit" />
  </base-page>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted } from 'vue-demi'
import { LanguageSettingResource } from '@core/modules/language/api'
import { LanguageSettingViewModel } from '@core/modules/language/models'
import { useRoute } from 'vue-router'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

const languageSettingResource = LanguageSettingResource({})

export default defineComponent({
  props: {
    mode: { type: String, requred: true },
  },
  setup(props) {
    // data
    const { mode } = toRefs(props)
    const currentCard = ref('accountInfo')
    const route = useRoute()
    const formData = ref(LanguageSettingViewModel())
    const fallBack = { name: 'LanguageSettingList' }
    const id = route.params.id || null

    // mounted
    onMounted(async () => {
      if (id) {
        const [res] = await callReadFetch(id)
        formData.value = res
      }
    })

    // methods
    const readFetch = (id, query) => languageSettingResource.get({ id, query })
    const createFetch = (payload) => languageSettingResource.post({ payload })
    const updateFetch = (id, payload) => languageSettingResource.patch({ id, payload })
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
      currentCard,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

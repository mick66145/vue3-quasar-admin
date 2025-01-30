<template>
  <div class="row q-col-gutter-md">
    <div class="col-24">
      <base-form ref="form">
        <responsive-splitter>
          <template #before>
            <vertical-tabs v-model="currentBlock">
              <q-tab name="basicInfo" :label="`${$t('g.card.basic-info.title')}`" />
              <q-tab name="advancedInfo" :label="`${$t('g.card.advanced-info.title')}`" />
            </vertical-tabs>
          </template>
          <template #after>
            <detail-scroll-area>
              <basic-info-block v-show="currentBlock === 'basicInfo'" :language-setting-form-data="formData" />
              <advanced-info-block v-show="currentBlock === 'advancedInfo'" :language-setting-form-data="formData" />
            </detail-scroll-area>
          </template>
        </responsive-splitter>
      </base-form>
    </div>
    <fixed-footer go-back-route="/language-setting" @confirm="onSubmit" />
  </div>
</template>

<script>
import BasicInfoBlock from './components/BasicInfoBlock.vue'
import AdvancedInfoBlock from './components/AdvancedInfoBlock.vue'
import { defineComponent, ref, toRefs, onMounted } from 'vue-demi'
import { useRoute } from 'vue-router'
import { LanguageSettingResource } from '@core/modules/language/api'
import { LanguageSettingViewModel } from '@core/modules/language/models'
import useForm from '@/hooks/useForm'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

const languageSettingResource = LanguageSettingResource({})

export default defineComponent({
  components: {
    BasicInfoBlock,
    AdvancedInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const { mode } = toRefs(props)
    const currentBlock = ref('basicInfo')
    const route = useRoute()
    const formData = ref(LanguageSettingViewModel())
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
          const [res] = await urlObj[mode.value]()
          if (res) goBack()
        }
      })
    }

    // use
    const { form, validationError, getErrorTab } = useForm({
      errorTabs: { basicInfo: ['name'] },
      handleError: (validationRef) => {
        currentBlock.value = getErrorTab(validationRef)
      },
    })
    const { goBack } = useGoBack()
    const { callReadFetch, callCreateFetch, callUpdateFetch } = useCRUD({
      readFetch: readFetch,
      createFetch: createFetch,
      updateFetch: updateFetch,
    })

    return {
      form,
      currentBlock,
      formData,
      validationError,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped>
.permissions-card {
  @apply mb-4;
  .permissions-title {
    @apply m-0 pl-3 self-center;
  }
}
</style>

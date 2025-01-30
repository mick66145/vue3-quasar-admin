<template>
  <div class="row q-col-gutter-md">
    <div class="col-24">
      <base-form ref="form" label-width="7rem" @validationError="validationError">
        <responsive-splitter>
          <template #before>
            <vertical-tabs v-model="currentBlock">
              <q-tab name="basicInfo" :label="`${$t('g.card.basic-info.title')}`" />
              <q-tab name="contentInfo" :label="`${$t('g.card.content-info.title')}`" />
            </vertical-tabs>
          </template>
          <template #after>
            <detail-scroll-area>
              <basic-info-block v-show="currentBlock === 'basicInfo'" :mailinfo-form-data="formData" />
              <content-info-block v-show="currentBlock === 'contentInfo'" :mailinfo-form-data="formData" />
            </detail-scroll-area>
          </template>
        </responsive-splitter>
      </base-form>
    </div>
    <fixed-footer go-back-route="/mailinfo" @confirm="onSubmit" />
  </div>
</template>

<script>
import BasicInfoBlock from './components/BasicInfoBlock.vue'
import ContentInfoBlock from './components/ContentInfoBlock.vue'
import { defineComponent, ref, toRefs, onMounted } from 'vue-demi'
import { MailinfoResource } from '@core/modules/mailinfo/api'
import { MailinfoViewModel } from '@core/modules/mailinfo/models'
import { useRoute } from 'vue-router'
import useForm from '@/hooks/useForm'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

const mailinfoResource = MailinfoResource({})

export default defineComponent({
  components: {
    BasicInfoBlock,
    ContentInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const { mode } = toRefs(props)
    const currentBlock = ref('basicInfo')
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
      errorTabs: { basicInfo: ['subject'] },
      handleError: (validationRef) => {
        console.log(getErrorTab(validationRef))
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

<style lang="postcss" scoped></style>

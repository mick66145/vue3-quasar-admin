<template>
  <div class="row q-col-gutter-md">
    <div class="col-24">
      <base-form ref="form" @validationError="validationError">
        <responsive-splitter>
          <template #before>
            <vertical-tabs v-model="currentBlock">
              <q-tab name="basicInfo" :label="`${$t('g.card.basic-info.title')}`" />
              <q-tab name="customerServiceInfo" :label="`${$t('company.detail.card.customer-service-info.title')}`" />
              <q-tab name="contactInfo" :label="`${$t('company.detail.card.contact-info.title')}`" />
            </vertical-tabs>
          </template>
          <template #after>
            <detail-scroll-area>
              <basic-info-block v-show="currentBlock === 'basicInfo'" :company-form-data="formData" />
              <customer-service-info-block v-show="currentBlock === 'customerServiceInfo'" :company-form-data="formData" />
              <contact-info-block v-show="currentBlock === 'contactInfo'" :company-form-data="formData" />
            </detail-scroll-area>
          </template>
        </responsive-splitter>
      </base-form>
    </div>
    <fixed-footer go-back-route="/company" @confirm="onSubmit" />
  </div>
</template>

<script>
import BasicInfoBlock from './components/BasicInfoBlock.vue'
import CustomerServiceInfoBlock from './components/CustomerServiceInfoBlock.vue'
import ContactInfoBlock from './components/ContactInfoBlock.vue'
import { defineComponent, ref, toRefs, onMounted } from 'vue-demi'
import { useRoute } from 'vue-router'
import { CompanyResource } from '@core/modules/company/api'
import { CompanyViewModel } from '@core/modules/company/models'
import useForm from '@/hooks/useForm'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

const companyResource = CompanyResource({})

export default defineComponent({
  components: {
    BasicInfoBlock,
    CustomerServiceInfoBlock,
    ContactInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const { mode } = toRefs(props)
    const currentBlock = ref('basicInfo')
    const route = useRoute()
    const formData = ref(CompanyViewModel())
    const id = route.params.id || null

    // mounted
    onMounted(async () => {
      if (id) {
        const [res] = await callReadFetch(id)
        formData.value = res
      }
    })

    // methods
    const readFetch = (id, query) => companyResource.get({ id, query })
    const createFetch = (payload) => companyResource.post({ payload })
    const updateFetch = (id, payload) => companyResource.patch({ id, payload })
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

<style lang="postcss" scoped></style>

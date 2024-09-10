<template>
  <padding-page>
    <page-header showPrev showCancel showConfirm @confirm="onSubmit">
      {{ $t('company.detail.title') }}
    </page-header>
    <base-tabs class="q-mb-md" v-model="currentBlock">
      <q-tab name="companyInfo" :label="`${$t('company.detail.card.company-info.title')}`" />
      <q-tab name="customerServiceInfo" :label="`${$t('company.detail.card.customer-service-info.title')}`" />
      <q-tab name="contactInfo" :label="`${$t('company.detail.card.contact-info.title')}`" />
    </base-tabs>
    <base-form ref="form" @validationError="validationError">
      <div class="row q-col-gutter-md">
        <div class="col-12" v-show="currentBlock === 'companyInfo'">
          <q-card class="h-full">
            <card-header>
              {{ $t('company.detail.card.company-info.title') }}
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('company.form.name')} *`">
                    <input-text v-model="formData.name" required class="full-width" name="name"
                      :label="`${$t('company.form.name')}`"
                      :placeholder="$t('g.common.input', { field: $t('company.form.name') })" />
                  </base-form-item>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('company.form.invoice')}`">
                    <input-text v-model="formData.invoice" class="full-width" :label="`${$t('company.form.invoice')}`"
                      :placeholder="$t('g.common.input', { field: $t('company.form.invoice') })" />
                  </base-form-item>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('g.common.uniform-number')}`">
                    <input-tw-uniform-number v-model="formData.vatnumber" class="full-width"
                      :label="`${$t('g.common.uniform-number')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.uniform-number') })" />
                  </base-form-item>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('company.form.leader')}`">
                    <input-text v-model="formData.ceo" class="full-width" :label="`${$t('company.form.leader')}`"
                      :placeholder="$t('g.common.input', { field: $t('company.form.leader') })" />
                  </base-form-item>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('company.form.established')}`">
                    <input-date v-model="formData.opendate" class="full-width"
                      :label="`${$t('company.form.established')}`"
                      :placeholder="$t('g.common.select', { field: $t('company.form.established') })" />
                  </base-form-item>
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
        <div class="col-12" v-show="currentBlock === 'customerServiceInfo'">
          <q-card class="h-full">
            <card-header>
              {{ $t('company.detail.card.customer-service-info.title') }}
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('company.form.customer-service-hotline')}`">
                    <input-tel v-model="formData.tel_service" class="full-width"
                      :label="`${$t('company.form.customer-service-hotline')}`"
                      :placeholder="$t('g.common.input', { field: $t('company.form.customer-service-hotline') })" />
                  </base-form-item>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('company.form.customer-service-hours')}`">
                    <input-text v-model="formData.service_time" class="full-width"
                      :label="`${$t('company.form.customer-service-hours')}`"
                      :placeholder="$t('g.common.input', { field: $t('company.form.customer-service-hours') })" />
                  </base-form-item>
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
        <div class="col-12" v-show="currentBlock === 'contactInfo'">
          <q-card>
            <card-header>
              {{ $t('company.detail.card.contact-info.title') }}
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('g.common.tel')}`">
                    <input-tel v-model="formData.tel" class="full-width" :label="`${$t('g.common.tel')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.tel') })" />
                  </base-form-item>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">

                  <base-form-item :label="`${$t('g.common.extension-number')}`">
                    <input-text v-model="formData.tel_ext" class="full-width"
                      :label="`${$t('g.common.extension-number')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.extension-number') })" />
                  </base-form-item>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('g.common.fax')}`">
                    <input-text v-model="formData.fax" class="full-width" :label="`${$t('g.common.fax')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.fax') })" />
                  </base-form-item>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('g.common.phone')}`">
                    <input-text v-model="formData.phone" class="full-width" :label="`${$t('g.common.phone')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.phone') })" />
                  </base-form-item>
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <base-form-item :label="`${$t('g.common.email')}`">
                    <input-email v-model="formData.email" class="full-width" :label="`${$t('g.common.email')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.email') })" />
                  </base-form-item>
                </div>
                <div class="col-12">
                  <base-form-item :label="`${$t('g.common.address')}`">
                    <input-address v-model="formData.address_obj" showPostCode />
                  </base-form-item>
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
      </div>
    </base-form>
    <fixed-footer go-back-route="/company" @confirm="onSubmit" />
  </padding-page>
</template>

<script>
import { defineComponent, ref, onMounted, toRefs } from 'vue-demi'
import { useRoute } from 'vue-router'
import { CompanyResource } from '@core/modules/company/api'
import { CompanyViewModel } from '@core/modules/company/models'
import useForm from '@/hooks/useForm'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

const companyResource = CompanyResource({})

export default defineComponent({
  props: {
    mode: { type: String, requred: true },
  },
  setup(props) {
    // data
    const { mode } = toRefs(props)
    const currentBlock = ref('companyInfo')
    const route = useRoute()
    const formData = ref(CompanyViewModel())
    const fallBack = { name: 'CompanyList' }
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
          const payload = formData.value
          payload.setAddress()
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
    const { validationError, getErrorTab } = useForm({
      errorTabs: {companyInfo: ['name']},
      handleError : (validationRef) => {
        currentBlock.value = getErrorTab(validationRef)
      }
    })
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
      validationError,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

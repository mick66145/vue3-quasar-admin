<template>
  <base-page>
    <page-header showPrev showCancel showConfirm @confirm="onSubmit">
      {{ $t('user.detail.title') }}
    </page-header>
    <base-tabs class="q-mb-md" v-model="currentCard">
      <q-tab name="accountInfo" :label="`${$t('user.detail.card.account-info.title')}`" />
    </base-tabs>
    <q-card>
      <card-header>
        {{ $t('user.detail.card.account-info.title') }}
      </card-header>
      <card-body class="q-pt-none">
        <base-form ref="form">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <base-form-item :label="`${$t('g.common.account')} *`">
                <input-text v-model="formData.account" class="full-width" :label="`${$t('g.common.account')}`"
                  :placeholder="$t('g.common.input', { field: $t('g.common.account') })" required
                  :readonly="mode === 'edit'" />
              </base-form-item>
            </div>
            <div v-if="mode === 'create'" class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <base-form-item :label="`${$t('g.common.password')}  *`">
                <input-password v-model="formData.password" class="full-width" :label="`${$t('g.common.password')}`"
                  autocomplete="new-password" :placeholder="$t('g.common.input', { field: $t('g.common.password') })"
                  required :rules="[
                    $rules.regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)(?!.* ).{8,}$/i, $t('g.validation.password'))
                  ]">
                  <template #hint>
                    {{ $t('g.validation.password') }}
                  </template>
                </input-password>
              </base-form-item>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <base-form-item :label="`${$t('user.form.name')} *`">
                <input-text v-model="formData.name" class="full-width" :label="`${$t('user.form.name')}`"
                  :placeholder="$t('g.common.input', { field: $t('user.form.name') })" required />
              </base-form-item>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <base-form-item :label="`${$t('g.common.email')}`">
                <input-email v-model="formData.email" class="full-width" :label="`${$t('g.common.email')}`"
                  :placeholder="$t('g.common.input', { field: $t('g.common.email') })" />
              </base-form-item>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <base-form-item :label="`${$t('user.form.company')}`">
                <input-company-select v-model="formData.company" class="full-width"
                  :label="`${$t('user.form.company')}`"
                  :placeholder="$t('g.common.input', { field: $t('user.form.company') })" />
              </base-form-item>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <base-form-item :label="`${$t('user.form.company-job')}`">
                <input-select v-model="formData.company_job" :options="companyJobList" class="full-width"
                  :label="`${$t('user.form.company-job')}`"
                  :placeholder="$t('g.common.select', { field: $t('user.form.company-job') })" />
              </base-form-item>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <base-form-item :label="`${$t('user.form.role')} *`">
                <input-select v-model="formData.role" :options="roleList" class="full-width"
                  :label="`${$t('user.form.role')}`"
                  :placeholder="$t('g.common.select', { field: $t('user.form.role') })" required />
              </base-form-item>
            </div>
            <div class="col-12">
              <base-form-item :label="`${$t('g.common.remark')}`">
                <input-textarea v-model="formData.remark" class="full-width" :label="`${$t('g.common.remark')}`"
                  :placeholder="$t('g.common.input', { field: $t('g.common.remark') })" />
              </base-form-item>
            </div>
          </div>
        </base-form>
      </card-body>
    </q-card>
  </base-page>
  <fixed-footer go-back-route="/user" @confirm="onSubmit" />
</template>

<script>
import { defineComponent, ref, toRefs, onMounted } from 'vue-demi'
import { useRoute } from 'vue-router'
import { UserResource } from '@core/modules/user/api'
import { CompanyJobResource } from '@core/modules/company-job/api'
import { RoleResource } from '@core/modules/role/api'
import { UserViewModel } from '@core/modules/user/models'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

const userResource = UserResource({})
const roleResource = RoleResource({})
const companyJobResource = CompanyJobResource({})

export default defineComponent({
  props: {
    mode: { type: String, requred: true },
  },
  setup(props) {
    // data
    const { mode } = toRefs(props)
    const currentCard = ref('accountInfo')
    const route = useRoute()
    const formData = ref(UserViewModel())
    const roleList = ref([])
    const companyJobList = ref([])
    const fallBack = { name: 'UserList' }
    const id = route.params.id || null

    // mounted
    onMounted(async () => {
      callRoleListFetch()
      callCompanyJobListFetch()
      if (id) {
        const [res] = await callReadFetch(id)
        formData.value = res
      }
    })

    // methods
    const readFetch = (id, query) => userResource.get({ id, query })
    const createFetch = (payload) => userResource.post({ payload })
    const updateFetch = (id, payload) => userResource.patch({ id, payload })

    const fetchRoleData = (query) => {
      return roleResource.list({ query }).then((res) => {
        roleList.value = []
        roleList.value = res.list
      })
    }

    const fetchCompanyJobData = (query) => {
      return companyJobResource.list({ query }).then((res) => {
        companyJobList.value = []
        companyJobList.value = res.list
      })
    }

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
    // role
    const { callReadListFetch: callRoleListFetch } = useCRUD({
      readListFetch: fetchRoleData,
    })
    // role
    const { callReadListFetch: callCompanyJobListFetch } = useCRUD({
      readListFetch: fetchCompanyJobData,
    })

    return {
      form,
      formData,
      currentCard,
      roleList,
      companyJobList,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

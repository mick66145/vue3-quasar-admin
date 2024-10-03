<template>
  <padding-page>
    <page-header showPrev showCancel showConfirm @confirm="onSubmit">
      {{ $t('data-access-role.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="dataAccessRoleInfo" :label="`${$t('data-access-role.detail.card.data-access-role-info.title')}`" />
    </base-tabs>
    <base-form ref="form">
      <div class="row q-col-gutter-md">
        <div v-show="currentBlock === 'dataAccessRoleInfo'" class="col-12">
          <q-card>
            <card-header>
              {{ $t('data-access-role.detail.card.data-access-role-info.title') }}
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <base-form-item :label="`${$t('data-access-role.form.name')} *`">
                    <input-text
                      v-model="formData.name"
                      class="full-width"
                      name="name"
                      :label="`${$t('data-access-role.form.name')}`"
                      :placeholder="$t('g.common.input', { field: $t('data-access-role.form.name') })"
                      required
                    />
                  </base-form-item>
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
import { DataAccessRoleResource } from '@core/modules/data-access-role/api'
import { DataAccessRoleViewModel } from '@core/modules/data-access-role/models'
import useForm from '@/hooks/useForm'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

const dataAccessRoleResource = DataAccessRoleResource({})

export default defineComponent({
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const { mode } = toRefs(props)
    const route = useRoute()
    const formData = ref(DataAccessRoleViewModel())
    const currentBlock = ref('dataAccessRoleInfo')
    const id = route.params.id || null

    // mounted
    onMounted(async () => {
      if (id) {
        const [res] = await callReadFetch(id)
        formData.value = res
      }
    })

    // methods
    const readFetch = (id, query) => dataAccessRoleResource.get({ id, query })
    const createFetch = (payload) => dataAccessRoleResource.post({ payload })
    const updateFetch = (id, payload) => dataAccessRoleResource.patch({ id, payload })
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
    const { form, validationError, getErrorTab } = useForm({
      errorTabs: { dataAccessRoleInfo: ['name'] },
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
      formData,
      currentBlock,
      validationError,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

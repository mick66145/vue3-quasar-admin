<template>
  <div class="row q-col-gutter-md">
    <div class="col-24">
      <base-form ref="form" label-width="8rem" @validationError="validationError">
        <responsive-splitter>
          <template #before>
            <vertical-tabs v-model="currentBlock">
              <q-tab name="basicInfo" :label="`${$t('g.card.basic-info.title')}`" />
              <q-tab name="permissionSetting" :label="`${$t('role.detail.card.permission-setting.title')}`" />
            </vertical-tabs>
          </template>
          <template #after>
            <detail-scroll-area>
              <basic-info-block v-show="currentBlock === 'basicInfo'" :role-form-data="formData" />
              <permission-setting-block v-show="currentBlock === 'permissionSetting'" ref="permissionSettingBlock" :permissions="permissions" />
            </detail-scroll-area>
          </template>
        </responsive-splitter>
      </base-form>
    </div>
    <fixed-footer go-back-route="/role" @confirm="onSubmit" />
  </div>
</template>

<script>
import BasicInfoBlock from './components/BasicInfoBlock.vue'
import PermissionSettingBlock from './components/PermissionSettingBlock.vue'
import { defineComponent, ref, toRefs, onMounted } from 'vue-demi'
import { useRoute } from 'vue-router'
import { RoleResource } from '@core/modules/role/api'
import { RoleViewModel } from '@core/modules/role/models'
import useForm from '@/hooks/useForm'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'
import _ from 'lodash-es'

const roleResource = RoleResource({})

export default defineComponent({
  components: {
    BasicInfoBlock,
    PermissionSettingBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // ref
    const permissionSettingBlock = ref()

    // data
    const { mode } = toRefs(props)
    const currentBlock = ref('basicInfo')
    const route = useRoute()
    const formData = ref(RoleViewModel())
    const permissions = ref([])
    const id = route.params.id || null

    // mounted
    onMounted(async () => {
      await permissionSettingBlock.value.getPermissions()
      if (id) {
        const [res] = await callReadFetch(id)
        const _permissions = _(res.permissions).map('id').value()
        formData.value = res
        permissions.value = _permissions
      }
    })

    // methods
    const readFetch = (id, query) => roleResource.get({ id, query })
    const createFetch = (payload) => roleResource.post({ payload })
    const updateFetch = (id, payload) => roleResource.patch({ id, payload })
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData.value }
          payload.permissions = []
          payload.permissions = permissionSettingBlock.value.getActivePermissions()
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
      permissionSettingBlock,
      currentBlock,
      formData,
      permissions,
      validationError,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

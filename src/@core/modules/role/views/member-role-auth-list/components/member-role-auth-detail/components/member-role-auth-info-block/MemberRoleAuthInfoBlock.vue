<template>
  <div class="row q-col-gutter-md">
    <div class="col-24">
      <base-form ref="form">
        <responsive-splitter>
          <template #before>
            <vertical-tabs v-model="currentBlock">
              <q-tab name="basicInfo" :label="`${$t('g.card.basic-info.title')}`" />
            </vertical-tabs>
          </template>
          <template #after>
            <detail-scroll-area>
              <basic-info-block v-show="currentBlock === 'basicInfo'" :role-auth-form-data="formData" />
            </detail-scroll-area>
          </template>
        </responsive-splitter>
      </base-form>
    </div>
    <fixed-footer go-back-route="/member-role-auth" @confirm="onSubmit" />
  </div>
</template>

<script>
import BasicInfoBlock from './components/BasicInfoBlock.vue'
import { defineComponent, ref, toRefs, onMounted } from 'vue-demi'
import { MemberRoleAuthResource } from '@core/modules/role/api'
import { MemberRoleAuthViewModel } from '@core/modules/role/models'
import { useRoute } from 'vue-router'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

export default defineComponent({
  components: {
    BasicInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const route = useRoute()
    const { mode } = toRefs(props)
    const currentBlock = ref('basicInfo')
    const formData = ref(MemberRoleAuthViewModel())
    const roleId = route.params.roleId || null
    const memberRoleAuthResource = MemberRoleAuthResource({
      params: { roleId },
    })

    // mounted
    onMounted(async () => {
      if (roleId) {
        const [memberRoleAuthRes] = await callMemberRoleAuthFetch(null)
        if (memberRoleAuthRes) { formData.value = memberRoleAuthRes }
      }
    })

    // methods
    const readMemberRoleAuthFetch = (id, query) => memberRoleAuthResource.get({ id, query })
    const updateFetch = (id, payload) => memberRoleAuthResource.put({ id, payload })
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData.value }
          const urlObj = {
            edit: () => callUpdateFetch(null, { ...payload }),
          }
          const [res] = await urlObj[mode.value]()
          if (res) goBack()
        }
      })
    }

    // use
    const { goBack } = useGoBack()
    const { form, callReadFetch: callMemberRoleAuthFetch, callUpdateFetch } = useCRUD({
      readFetch: readMemberRoleAuthFetch,
      updateFetch: updateFetch,
    })

    return {
      form,
      currentBlock,
      formData,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-24">
      <base-form ref="form" label-width="10rem">
        <responsive-splitter>
          <template #before>
            <vertical-tabs v-model="currentBlock">
              <q-tab name="basicInfo" :label="`${$t('g.card.basic-info.title')}`" />
            </vertical-tabs>
          </template>
          <template #after>
            <detail-scroll-area>
              <basic-info-block v-show="currentBlock === 'basicInfo'" :data-access-role-form-data="dataAccessRoleFormData" :mode="mode" />
            </detail-scroll-area>
          </template>
        </responsive-splitter>
      </base-form>
    </div>
    <fixed-footer go-back-route="/data-access-role" @confirm="onSubmit" />
  </div>
</template>

<script>
import BasicInfoBlock from './components/BasicInfoBlock.vue'
import { defineComponent, ref, onMounted, toRefs } from 'vue-demi'
import { DataAccessRoleResource } from '@core/modules/data-access-role/api'
import { DataAccessRoleViewModel } from '@core/modules/data-access-role/models'
import { useRoute } from 'vue-router'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

const dataAccessRoleResource = DataAccessRoleResource({})

export default defineComponent({
  components: {
    BasicInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const { mode } = toRefs(props)
    const route = useRoute()
    const dataAccessRoleFormData = ref(DataAccessRoleViewModel())
    const fallBack = { name: 'DataAccessRoleList' }
    const currentBlock = ref('basicInfo')
    const id = route.params.id || null

    // mounted
    onMounted(async () => {
      if (id) {
        const [res] = await callReadFetch(id)
        dataAccessRoleFormData.value = res
      }
    })

    // methods
    const readFetch = (id, query) => dataAccessRoleResource.get({ id, query })
    const createFetch = (payload) => dataAccessRoleResource.post({ payload })
    const updateFetch = (id, payload) => dataAccessRoleResource.patch({ id, payload })
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...dataAccessRoleFormData.value }
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
    const { goBack } = useGoBack({ fallBack })
    const { form, callReadFetch, callCreateFetch, callUpdateFetch } = useCRUD({
      readFetch: readFetch,
      createFetch: createFetch,
      updateFetch: updateFetch,
    })

    return {
      form,
      currentBlock,
      dataAccessRoleFormData,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

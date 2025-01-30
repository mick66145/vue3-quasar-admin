<template>
  <div class="row q-col-gutter-md">
    <div class="col-24">
      <base-form ref="form" label-width="7rem">
        <responsive-splitter>
          <template #before>
            <vertical-tabs v-model="currentBlock">
              <q-tab name="basicInfo" :label="`${$t('g.card.basic-info.title')}`" />
              <q-tab name="advancedInfo" :label="`${$t('g.card.advanced-info.title')}`" />
            </vertical-tabs>
          </template>
          <template #after>
            <detail-scroll-area>
              <basic-info-block v-show="currentBlock === 'basicInfo'" :user-form-data="userFormData" :mode="mode" />
              <advanced-info-block v-show="currentBlock === 'advancedInfo'" :user-form-data="userFormData" />
            </detail-scroll-area>
          </template>
        </responsive-splitter>
      </base-form>
    </div>
    <fixed-footer go-back-route="/user" @confirm="onSubmit" />
  </div>
</template>

<script>
import BasicInfoBlock from './components/BasicInfoBlock.vue'
import AdvancedInfoBlock from './components/AdvancedInfoBlock.vue'
import { defineComponent, ref, onMounted, toRefs } from 'vue-demi'
import { UserResource } from '@core/modules/user/api'
import { UserViewModel } from '@core/modules/user/models'
import { useRoute } from 'vue-router'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

const userResource = UserResource({})

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
    const route = useRoute()
    const userFormData = ref(UserViewModel())
    const fallBack = { name: 'UserList' }
    const currentBlock = ref('basicInfo')
    const id = route.params.id || null

    // mounted
    onMounted(async () => {
      if (id) {
        const [res] = await callReadFetch(id)
        userFormData.value = res
      }
    })

    // methods
    const readFetch = (id, query) => userResource.get({ id, query })
    const createFetch = (payload) => userResource.post({ payload })
    const updateFetch = (id, payload) => userResource.patch({ id, payload })
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...userFormData.value }
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
      userFormData,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

<template>
  <div class="col-24">
    <base-form ref="form" label-width="10rem">
      <responsive-splitter>
        <template #before>
          <vertical-tabs v-model="currentBlock">
            <q-tab name="basicInfo" :label="`${$t('g.card.basic-info.title')}`" />
            <q-tab name="advancedInfo" :label="`${$t('g.card.advanced-info.title')}`" />
          </vertical-tabs>
        </template>
        <template #after>
          <detail-scroll-area>
            <basic-info-block v-show="currentBlock === 'basicInfo'" :frontend-menu-form-data="frontendMenuFormData" :mode="mode" />
            <advanced-info-block v-show="currentBlock === 'advancedInfo'" :frontend-menu-form-data="frontendMenuFormData" />
          </detail-scroll-area>
        </template>
      </responsive-splitter>
    </base-form>
    <fixed-footer go-back-route="/frontend-menu" @confirm="onSubmit" />
  </div>
</template>

<script>
import BasicInfoBlock from './components/BasicInfoBlock.vue'
import AdvancedInfoBlock from './components/AdvancedInfoBlock.vue'
import { defineComponent, ref, onMounted, toRefs } from 'vue-demi'
import { FrontendMenuViewModel, FrontendMenuPayloadViewModel } from '@core/modules/frontend-menu/models'
import { useFrontendMenuStore } from '@core/modules/frontend-menu/stores'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import useNavigation from '@/hooks/useNavigation'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

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
    const frontendMenuStore = useFrontendMenuStore()
    const frontendMenuFormData = ref(FrontendMenuViewModel())
    const currentBlock = ref('basicInfo')
    const fallBack = { name: 'FrontendMenuList' }
    const id = route.params.id || null

    // mounted
    onMounted(async () => {
      if (id) {
        const [frontendMenuRes] = await callReadFrontendMenuFetch(id)
        if (frontendMenuRes) { frontendMenuFormData.value = frontendMenuRes }
      }
    })
    // beforeRouteLeave
    onBeforeRouteLeave(() => {
      removeNavigationData()
    })

    // methods
    const readFrontendMenuFetch = (id, query) => frontendMenuStore.get({ id, query })
    const createFrontendMenuFetch = (payload) => frontendMenuStore.post({ payload })
    const updateFrontendMenuFetch = (id, payload) => frontendMenuStore.patch({ id, payload })
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = FrontendMenuPayloadViewModel({ ...frontendMenuFormData.value })
          if (mode.value === 'create') {
            const { parent } = getNavigationData({})
            payload.parent = parent
          }
          const urlObj = {
            create: () => callCreateFrontendMenuFetch({ ...payload }),
            edit: () => callUpdateFrontendMenuFetch(id, { ...payload }),
          }
          const [res] = await urlObj[mode.value]()
          if (res) goBack()
        }
      })
    }

    // use
    const { goBack } = useGoBack({ fallBack })
    const { form, callReadFetch: callReadFrontendMenuFetch, callCreateFetch: callCreateFrontendMenuFetch, callUpdateFetch: callUpdateFrontendMenuFetch } = useCRUD({
      readFetch: readFrontendMenuFetch,
      createFetch: createFrontendMenuFetch,
      updateFetch: updateFrontendMenuFetch,
    })
    const { getNavigationData, removeNavigationData } = useNavigation({})

    return {
      form,
      frontendMenuFormData,
      currentBlock,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

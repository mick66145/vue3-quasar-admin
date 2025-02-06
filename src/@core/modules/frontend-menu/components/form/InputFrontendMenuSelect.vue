<template>
  <input-select
    v-model="observeValue"
    :options="frontendMenuList"
    :label="observeLabel"
    :placeholder="observePlaceholder"
  />
</template>

<script>
import { defineComponent, ref, computed, onMounted, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { FrontendMenuResource } from '@core/modules/frontend-menu/api'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'

const frontendMenuResource = FrontendMenuResource({})

export default defineComponent({
  props: {
    modelValue: { type: [String, Object] },
    type: { type: String },
    label: { type: String },
    useFirstCall: { type: Boolean, default: true },
    placeholder: { type: String },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const { type, label, placeholder, useFirstCall } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)
    const frontendMenuList = ref([])

    // computed
    const observeLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.common.frontend-menu')
    })
    const observePlaceholder = computed(() => {
      return placeholder.value ? placeholder.value : i18n.global.t('g.common.select', { field: i18n.global.t('g.common.frontend-menu') })
    })

    // mounted
    onMounted(() => {
      if (useFirstCall.value) callReadListFetch()
    })

    // methods
    const fetchData = () => {
      const query = { type: type.value, orderby: 'sequence:asc,created_at:desc' }
      return frontendMenuResource.list({ query }).then((res) => {
        frontendMenuList.value = []
        frontendMenuList.value = res.list
      })
    }
    const clearData = () => { frontendMenuList.value = [] }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      observeValue,
      observeLabel,
      observePlaceholder,
      frontendMenuList,
      fetchData,
      clearData,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>

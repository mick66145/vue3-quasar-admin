<template>
  <input-select
    v-model="observeValue"
    :options="companyJobList"
    :label="observeLabel"
    :placeholder="observePlaceholder"
  />
</template>

<script>
import { defineComponent, ref, computed, onMounted, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { CompanyJobResource } from '@core/modules/company-job/api'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'

const companyJobResource = CompanyJobResource({})

export default defineComponent({
  props: {
    modelValue: { type: [String, Object] },
    label: { type: String },
    useFirstCall: { type: Boolean, default: true },
    placeholder: { type: String },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const { label, placeholder, useFirstCall } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)
    const companyJobList = ref([])

    // computed
    const observeLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.common.company-job')
    })
    const observePlaceholder = computed(() => {
      return placeholder.value ? placeholder.value : i18n.global.t('g.common.select', { field: i18n.global.t('g.common.company-job') })
    })

    // mounted
    onMounted(() => {
      if (useFirstCall.value) callReadListFetch()
    })

    // methods
    const fetchData = (query) => {
      return companyJobResource.list({ query }).then((res) => {
        companyJobList.value = []
        companyJobList.value = res.list
      })
    }
    const clearData = () => companyJobList.value = []

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      observeValue,
      observeLabel,
      observePlaceholder,
      companyJobList,
      fetchData,
      clearData,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>

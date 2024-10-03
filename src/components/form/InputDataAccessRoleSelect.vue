<template>
  <input-multiple-select
    v-model="observeValue"
    :options="dataAccessRoleList"
    :label="observeLabel"
    :placeholder="observePlaceholder"
  />
</template>

<script>
import { defineComponent, ref, computed, onMounted, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { DataAccessRoleResource } from '@core/modules/data-access-role/api'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'

const dataAccessRoleResource = DataAccessRoleResource({})

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
    const dataAccessRoleList = ref([])

    // computed
    const observeLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.common.data-access-role')
    })
    const observePlaceholder = computed(() => {
      return placeholder.value ? placeholder.value : i18n.global.t('g.common.select', { field: i18n.global.t('g.common.data-access-role') })
    })

    // mounted
    onMounted(() => {
      if (useFirstCall.value) callReadListFetch()
    })

    // methods
    const fetchData = (query) => {
      return dataAccessRoleResource.list({ query }).then((res) => {
        dataAccessRoleList.value = []
        dataAccessRoleList.value = res.list
      })
    }
    const clearData = () => dataAccessRoleList.value = []

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      observeValue,
      observeLabel,
      observePlaceholder,
      dataAccessRoleList,
      fetchData,
      clearData,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>

<template>
  <input-select
    v-model="observeValue"
    :options="roleList"
    :label="observeLabel"
    :placeholder="observePlaceholder"
  />
</template>

<script>
import { defineComponent, ref, computed, onMounted, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { RoleResource } from '@core/modules/role/api'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'

const roleResource = RoleResource({})

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
    const roleList = ref([])

    // computed
    const observeLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.common.role')
    })
    const observePlaceholder = computed(() => {
      return placeholder.value ? placeholder.value : i18n.global.t('g.common.select', { field: i18n.global.t('g.common.role') })
    })

    // mounted
    onMounted(() => {
      if (useFirstCall.value) callReadListFetch()
    })

    // methods
    const fetchData = (query) => {
      return roleResource.list({ query }).then((res) => {
        roleList.value = []
        roleList.value = res.list
      })
    }
    const clearData = () => roleList.value = []

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      observeValue,
      observeLabel,
      observePlaceholder,
      roleList,
      fetchData,
      clearData,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>

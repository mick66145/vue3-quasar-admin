<template>
  <vxe-client-tree-table
    ref="dataTable"
    :data="frontendMenuList"
    :show-pagination="false"
    :checkbox-config="{labelField: 'name'}"
    @checkbox-change="onCheckboxChange"
    @checkbox-all="onCheckboxAll"
  >
    <vxe-column type="checkbox" field="name" title="選取" min-width="200" tree-node />
  </vxe-client-tree-table>
</template>

<script>
import { defineComponent, ref, onMounted, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { useFrontendMenuStore } from '@core/modules/frontend-menu/stores'
import { filterIncludesMapBy } from '@/utils/lodash'
import useCRUD from '@/hooks/useCRUD'

export default defineComponent({
  props: {
    modelValue: { type: [String, Object] },
    type: { type: String },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // ref
    const dataTable = ref()

    // data
    const frontendMenuStore = useFrontendMenuStore()
    const { type } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)
    const frontendMenuList = ref([])

    // mounted
    onMounted(async () => {
      await callReadListFetch()
      const selectedRows = filterIncludesMapBy(frontendMenuList.value, observeValue.value, 'id')
      dataTable.value.setCheckboxRow(selectedRows, true)
    })

    // methods
    const fetchData = () => {
      const query = { type: type.value, orderby: 'sequence:asc,created_at:desc' }
      return frontendMenuStore.list({ query }).then((res) => {
        frontendMenuList.value = []
        frontendMenuList.value = res.list
      })
    }
    const clearData = () => { frontendMenuList.value = [] }
    const onCheckboxChange = () => {
      observeValue.value = dataTable.value.getCheckboxRecords()
    }
    const onCheckboxAll = () => {
      observeValue.value = dataTable.value.getCheckboxRecords()
    }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      dataTable,
      observeValue,
      frontendMenuList,
      fetchData,
      clearData,
      onCheckboxChange,
      onCheckboxAll,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>

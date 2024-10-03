<template>
  <input-select
    v-model="observeValue"
    :options="userList"
    :required="required"
    :label="observeLabel"
    :placeholder="observePlaceholder"
  />
</template>

<script>
import { defineComponent, ref, computed, onMounted, toRefs } from 'vue-demi'
import { UserResource } from '@core/modules/user/api'
import { useVModel } from '@vueuse/core'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'

const userResource = UserResource({})

export default defineComponent({
  props: {
    modelValue: { type: [String, Object] },
    required: { type: Boolean, default: false },
    label: { type: String },
    placeholder: { type: String },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const { label, placeholder } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)
    const userList = ref([])

    // computed
    const observeLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('user.form.name')
    })
    const observePlaceholder = computed(() => {
      return placeholder.value ? placeholder.value : i18n.global.t('g.common.select', { field: i18n.global.t('user.form.name') })
    })

    // mounted
    onMounted(() => {
      callReadListFetch()
    })

    // methods
    const fetchData = () => {
      const query = { orderby: 'created_at:desc' }
      return userResource.list({ query }).then((res) => {
        userList.value = []
        userList.value = res.list
      })
    }
    const clearData = () => { userList.value = [] }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      observeValue,
      observeLabel,
      observePlaceholder,
      userList,
      fetchData,
      clearData,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>

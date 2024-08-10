<template>
  <div class="row q-col-gutter-md">
    <div class="row col-12">
      <language-tabs v-model="currentLang" @update:modelValue="onChange('languageTabs')"  />
    </div>
    <div class="col-12">
      <simple-dynamic-form ref="simpleDynamicForm" :models="observeModels" :store="storeForm"  />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, toRefs } from 'vue-demi'
import { useFormStore } from './stores/form'

export default defineComponent({
  props: {
    id: { type: String, default : "languageSimpleDynamicForm" },
    models: { type: Array, default() { return [] } },
  },
  setup(props) {
    // data
    const { models } = toRefs(props)
    const simpleDynamicForm = ref()
    const storeForm = useFormStore(props.id)
    const currentLang = ref('zh-TW')
    const observeModels = ref([])

    // mounted
    onMounted(() => {
      observeModels.value = models.value.map(item => item.locale !== currentLang.value ? { ...item, is_show: false } : item) || [];
    })

    // methods
    const getFormModels = () => {
      return simpleDynamicForm.value.getFormModels()
    }
    const getFormData = () =>{
      return simpleDynamicForm.value.getFormData()
    }
    const onChange = (action) => {
      switch (action) {
      case 'languageTabs':
        observeModels.value = getLocaleModel()
        break
      default:
        break
      }
    }
    const getLocaleModel = () => {
      return Array.from(getFormModels()).map(item =>{ return { ...item, is_show: item.locale === currentLang.value }}) || []
    }

    return {
      simpleDynamicForm,
      storeForm,
      currentLang,
      observeModels,
      getFormModels,
      getFormData,
      onChange
    }
  },
})

</script>

<style lang="postcss" scoped></style>

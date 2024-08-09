<template>
  <div class="row q-col-gutter-md">
    <div class="row col-12">
      <language-tabs v-model="currentLang" @update:modelValue="onChange('languageTabs')"  />
    </div>
    <simple-dynamic-form :id="id" :models="observeModels"  />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, toRefs } from 'vue-demi'

export default defineComponent({
  props: {
    id: { type: String, default : "languageSimpleDynamicForm" },
    models: { type: Array, default() { return [] } },
  },
  setup(props) {
    // data
    const { models } = toRefs(props)
    const currentLang = ref('zh-TW')
    const observeModels = ref([])

    // mounted
    onMounted(() => {
      observeModels.value = getLocaleModel()
    })

    // methods
    const onChange = (action) => {
      switch (action) {
      case 'languageTabs':
        observeModels.value = getLocaleModel()
        break
      default:
        break
      }
    }
    const getLocaleModel = () =>{
      return models.value.map(item => item.locale !== currentLang.value ? { ...item, is_show: false } : item) || [];
    }

    return {
      currentLang,
      observeModels,
      onChange
    }
  },
})

</script>

<style lang="postcss" scoped></style>

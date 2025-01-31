<template>
  <input-radio-option-group
    v-model="observeValue"
    :label="label"
    :options="mediaList"
  />
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent } from 'vue-demi'
import { mediaList } from '@/config/config-media'
export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null] },
    label: { type: String, default: '性別' },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    const observeValue = useVModel(props, 'modelValue', emit)
    return {
      observeValue,
      mediaList,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

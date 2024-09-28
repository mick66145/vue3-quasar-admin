<template>
  <div class="row q-col-gutter-md">
    <div class="col-6">
      <input-time class="w-full" v-model="observeValue.start_time" />
    </div>
    <div class="col-6">
      <input-time class="w-full" v-model="observeValue.end_time" :min="observeValue.start_time" />
    </div>
  </div>
</template>

<script>
import { defineComponent} from 'vue-demi'
import { useVModel } from '@vueuse/core'
export default defineComponent({
  props: {
    modelValue: { type: Object, default: { start_time: null, end_time: null } },
  },
  emits: [
    'update:modelValue',
  ],
  setup(props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)

    return {
      observeValue,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

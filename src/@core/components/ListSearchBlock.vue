<template>
  <div class="row items-center q-col-gutter-x-md q-col-gutter-y-xs">
    <slot name="default" />
    <div v-if="showInputSearch" :class="inputSearchCol">
      <input-search
        v-model="sourceData.keyword"
        class="full-width"
        dense
        @change="onChangeFilter"
      />
    </div>
    <div v-if="showResetButton" :class="resetButtonCol">
      <reset-button
        class="w-full"
        @click="onReset"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  props: {
    modelValue: { type: [Object, String] },
    showInputSearch: { type: Boolean, default: true },
    showResetButton: { type: Boolean, default: true },
    inputSearchCol: { type: String, default: 'col-24 col-sm-12 col-md-8 col-xl-6' },
    resetButtonCol: { type: String, default: 'col-24 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-2xl-2' },
  },
  emits: ['reset', 'changeFilter'],
  setup (props, { emit }) {
    // data
    const sourceData = useVModel(props, 'modelValue', emit)

    // methods
    const onChangeFilter = () => {
      emit('changeFilter')
    }
    const onReset = () => {
      emit('reset')
    }

    return {
      sourceData,
      onChangeFilter,
      onReset,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>

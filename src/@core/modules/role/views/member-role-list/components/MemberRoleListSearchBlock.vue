<template>
  <list-search-block
    v-model="sourceData"
    @changeFilter="onChangeFilter"
    @reset="onReset"
  />
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  props: {
    modelValue: { type: [Object, String] },
  },
  emits: ['changeFilter', 'reset'],
  setup (props, { emit }) {
    // data
    const sourceData = useVModel(props, 'modelValue', emit)

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

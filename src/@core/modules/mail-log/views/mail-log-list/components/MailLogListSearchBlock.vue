<template>
  <list-search-block
    v-model="sourceData"
    @changeFilter="onChangeFilter"
    @reset="onReset"
  >
    <div class="col-md-6 col-sm-12 col-24">
      <input-date-range
        v-model="sourceData.date_range"
        class="full-width"
        dense
        @update:modelValue="onChangeFilter"
      />
    </div>
  </list-search-block>
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

<template >
  <div class="py-[10px] q-gutter-x-sm">
    <selected-chip
      v-for="(option, optionIndex) in options"
      :key="optionIndex"
      :val="option"
      :label="option[optionLabel]"
      @update:selected="onSelected"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue-demi";
import { useVModel } from '@vueuse/core'
export default defineComponent({
  props: {
    modelValue: { type: [Array], default() { return []} },
    options: { type: Array, default() { return [];}},
    optionLabel: { type: String, default: "name" },
  },
  emits: [
    'update:modelValue',
  ],
  setup(props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)

    const onSelected = ({state,val}) =>{
      if(state) { 
        observeValue.value.push(val)
      } else { 
        const index = observeValue.value.findIndex(item => item.val === val)
        observeValue.value.splice(index,1)
      }
      emit('update:modelValue', observeValue.value)
    }
    
    return {
      observeValue,
      onSelected
    };
  },
});
</script>

<style lang="postcss" scoped>
</style>

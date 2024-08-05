<template>
  <base-chip
    v-model:selected="selected"
    :color="selected ? selectedColor : color"
    :text-color="selected ? selectedTextColor : textColor"
    :label="label"
    :clickable="true"
    :square="true"
    @update:selected="onSelected"
  />
</template>

<script>
import { defineComponent, ref } from "vue-demi";
export default defineComponent({
  props: {
    label: { type: String},
    val: { type: [String,Object,Number]},
    color: { type: String , default: 'white' },
    textColor: { type: String , default: 'primary' },
    selectedColor: { type: String , default: 'primary' },
    selectedTextColor: { type: String , default: 'white' },
  },
  emits: ['update:selected'],
  setup(props,{emit}) {
    //data
    const selected = ref(false)

    const onSelected = (state) =>{
      emit('update:selected', { state:state,val:props.val})
    }
    return {
      selected,
      onSelected,
    };
  },
});
</script>

<style lang="postcss" scoped>
</style>

<template>
  <base-tabs v-model="observeValue" vertical>
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
  </base-tabs>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  props: {
    modelValue: { type: String },
  },
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

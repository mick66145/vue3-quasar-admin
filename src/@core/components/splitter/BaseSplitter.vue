<template>
  <q-splitter v-model="splitterModel">
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
    <template v-if="$slots.before" #before>
      <slot name="before" />
    </template>
    <template v-if="$slots.after" #after>
      <slot name="after" />
    </template>
  </q-splitter>
</template>

<script>
import { defineComponent, computed, toRefs } from "vue-demi";
import useScreen from '@/hooks/useScreen'

export default defineComponent({
  props: {
    modelValue: { type: String },
    desktopSize: { type: Number, default: 10 },
    tabletSize: { type: Number, default: 15 },
    mobileSize: { type: Number, default: 20 },
  },
  setup(props) {
    // data
    const { desktopSize, tabletSize, mobileSize } = toRefs(props)
    const { deviceType } = useScreen({})

    // computed
    const splitterModel = computed(() => {
      return deviceType.value ==='mobile' ? mobileSize.value : (deviceType.value ==='tablet' ? tabletSize.value : desktopSize.value)
    })

    return {
      splitterModel
    };
  },
});
</script>

<style lang="postcss" scoped></style>

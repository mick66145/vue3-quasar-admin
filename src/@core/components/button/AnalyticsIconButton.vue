<template>
  <base-icon-button
    icon="analytics"
    :outline="outline"
    :label="buttonLabel"
  />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
export default defineComponent({
  props: {
    label: { type: String },
    outline: { type: Boolean, default: true },
  },
  setup (props) {
    // data
    const { label } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.btn.analytics')
    })

    return {
      buttonLabel,
    }
  },
})
</script>

<style lang="postcss" scoped>

</style>

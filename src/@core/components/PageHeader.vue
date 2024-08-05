<template>
  <div class="bg-grey-1 row py-3 page-header items-center justify-between top-[4rem]" :class="observeClass">
    <div class="flex items-center">
      <SvgIcon v-if="showPrev" icon="arrow-left" class="cursor-pointer" size="24" @click="onPrev" />
      <h1 class="flex-center row page-title" :class="showPrev && 'cursor-pointer'" @click="onPrev">
        <slot />
      </h1>
    </div>
    <div>
      <cancel-button
        v-if="showCancel"
        class="q-mr-sm q-px-lg"
        :color="cancelButtonColor"
        :label="cancelButtonLabel"
        @click="onCancel"
      />
      <template v-if="$slots.action">
        <slot name="action" />
      </template>
      <confirm-button
        v-if="showConfirm"
        class="q-px-lg"
        :color="confirmButtonColor"
        :label="confirmButtonLabel"
        @click="onConfirm"
      />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { defineComponent, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
import useGoBack from '@/hooks/useGoBack'

export default defineComponent({
  props: {
    showPrev: { type: Boolean, default: false },
    showCancel: { type: Boolean, default: false },
    showConfirm: { type: Boolean, default: false },
    goBackRoute: { type: String, default: '' },
    sticky: { type: Boolean, default: true },
    top: { type: String, default: '4rem' },
    cancelButtonColor: { type: String, default: 'primary' },
    cancelButtonText: { type: String },
    confirmButtonColor: { type: String, default: 'primary' },
    confirmButtonText: { type: String },
    autoBack: { type: Boolean, default: true },
  },
  emits: ['click:prev', 'cancel', 'save'],

  setup (props, { emit }) {
    // data
    const router = useRouter()
    const { showPrev, sticky, top, goBackRoute, cancelButtonText, confirmButtonText, autoBack } = toRefs(props)

    // computed
    const observeClass = computed(() => {
      const classObj = {
        sticky: sticky.value,
        'z-[2000]': sticky.value,
      }
      classObj[`top-[${top.value}]`] = sticky.value
      return classObj
    })
    const cancelButtonLabel = computed(() => {
      return cancelButtonText.value ? cancelButtonText.value : i18n.global.t('g.btn.go-back')
    })
    const confirmButtonLabel = computed(() => {
      return confirmButtonText.value ? confirmButtonText.value : i18n.global.t('g.btn.save')
    })

    // methods
    const { goBack } = useGoBack({ autoBack: autoBack.value, fallBack: goBackRoute.value })
    const onPrev = () => {
      if (showPrev.value) {
        emit('click:prev')
        if (goBackRoute.value) {
          return router.push(goBackRoute.value)
        }
        if (window.history.length === 2 && !window.history.state.back) {
          return router.replace('/')
        }
        router.go(-1)
      }
    }
    const onCancel = () => {
      emit('cancel')
      goBack()
    }
    const onConfirm = () => {
      emit('confirm')
    }

    return {
      observeClass,
      cancelButtonLabel,
      confirmButtonLabel,
      onPrev,
      onCancel,
      onConfirm,
    }
  },
})
</script>

<style lang="postcss" scoped>
.page-header {
  @apply min-h-10;
  .page-title {
    @apply font-bold my-0 text-2xl;
  }
}
</style>

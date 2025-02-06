<template>
  <base-page>
    <page-header showPrev showCancel>
      {{ $t('frontend-menu.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="frontendMenuInfo" :label="`${$t('frontend-menu.detail.card.frontend-menu.detail.title')}`" />
    </base-tabs>
    <div class="row q-col-gutter-md">
      <frontend-menu-info-block v-show="currentBlock === 'frontendMenuInfo'" :mode="mode" />
    </div>
  </base-page>
</template>

<script>
import FrontendMenuInfoBlock from './components/frontend-menu-info-block/FrontendMenuInfoBlock.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    FrontendMenuInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup () {
    // data
    const currentBlock = ref('frontendMenuInfo')

    return {
      currentBlock,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

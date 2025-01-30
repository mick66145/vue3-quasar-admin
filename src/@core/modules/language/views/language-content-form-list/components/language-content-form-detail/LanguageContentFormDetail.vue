<template>
  <base-page>
    <page-header showPrev showCancel>
      {{ $t('language-content-form.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="languageContentForm" :label="`${$t('language-content-form.detail.card.language-content-form-info.title')}`" />
    </base-tabs>
    <language-content-form-block v-show="currentBlock === 'languageContentForm'" :mode="mode" />
  </base-page>
</template>

<script>
import LanguageContentFormBlock from './components/language-content-form-block/LanguageContentFormBlock.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    LanguageContentFormBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup () {
    // data
    const currentBlock = ref('languageContentForm')

    return {
      currentBlock,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

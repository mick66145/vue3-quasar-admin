<template>
  <base-page>
    <page-header showPrev showCancel>
      {{ $t('language-content-form-field.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="languageContentFormField" :label="`${$t('language-content-form-field.detail.card.language-content-form-field-info.title')}`" />
    </base-tabs>
    <language-content-form-field-block v-show="currentBlock === 'languageContentFormField'" :mode="mode" />
  </base-page>
</template>

<script>
import LanguageContentFormFieldBlock from './components/language-content-form-field-block/LanguageContentFormFieldBlock.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    LanguageContentFormFieldBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup () {
    // data
    const currentBlock = ref('languageContentFormField')

    return {
      currentBlock,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

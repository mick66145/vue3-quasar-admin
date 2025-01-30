<template>
  <base-page>
    <page-header showPrev showCancel>
      {{ $t('language-setting.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="languageSetting" :label="`${$t('language-setting.detail.card.language-setting.title')}`" />
    </base-tabs>
    <language-setting-block v-show="currentBlock === 'languageSetting'" :mode="mode" />
  </base-page>
</template>

<script>
import LanguageSettingBlock from './components/language-setting-block/LanguageSettingBlock.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    LanguageSettingBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup () {
    // data
    const currentBlock = ref('languageSetting')

    return {
      currentBlock,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

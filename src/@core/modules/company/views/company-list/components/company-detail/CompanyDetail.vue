<template>
  <base-page>
    <page-header showPrev showCancel>
      {{ $t('company.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="companyInfo" :label="`${$t('company.detail.card.company-info.title')}`" />
    </base-tabs>
    <company-info-block v-show="currentBlock === 'companyInfo'" :mode="mode" />
  </base-page>
</template>

<script>
import CompanyInfoBlock from './components/company-info-block/CompanyInfoBlock.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    CompanyInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup () {
    // data
    const currentBlock = ref('companyInfo')

    return {
      currentBlock,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

<template>
  <base-page>
    <page-header showPrev showCancel>
      {{ $t('mailinfo.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="mailInfo" :label="`${$t('mailinfo.detail.card.mail-info.title')}`" />
    </base-tabs>
    <mail-info-block v-show="currentBlock === 'mailInfo'" :mode="mode" />
  </base-page>
</template>

<script>
import MailInfoBlock from './components/mail-info-block/MailInfoBlock.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    MailInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup () {
    // data
    const currentBlock = ref('mailInfo')

    return {
      currentBlock,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

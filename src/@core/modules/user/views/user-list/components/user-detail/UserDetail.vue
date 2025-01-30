<template>
  <base-page>
    <page-header showPrev showCancel>
      {{ $t('user.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="accountInfo" :label="`${$t('user.detail.card.account-info.title')}`" />
    </base-tabs>
    <user-info-block v-show="currentBlock === 'accountInfo'" :mode="mode" />
  </base-page>
</template>

<script>
import UserInfoBlock from './components/user-info-block/UserInfoBlock.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    UserInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const currentBlock = ref('accountInfo')

    return {
      currentBlock,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

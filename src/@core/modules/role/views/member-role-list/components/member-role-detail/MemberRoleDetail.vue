<template>
  <base-page>
    <page-header showPrev showCancel>
      {{ $t('member-role.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="memberRoleInfo" :label="`${$t('member-role.detail.card.member-role-info.title')}`" />
    </base-tabs>
    <member-role-info-block v-show="currentBlock === 'memberRoleInfo'" :mode="mode" />
  </base-page>
</template>

<script>
import MemberRoleInfoBlock from './components/member-role-info-block/MemberRoleInfoBlock.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    MemberRoleInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup () {
    // data
    const currentBlock = ref('memberRoleInfo')

    return {
      currentBlock,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

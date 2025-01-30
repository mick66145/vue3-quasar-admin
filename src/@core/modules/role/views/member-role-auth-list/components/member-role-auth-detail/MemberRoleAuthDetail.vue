<template>
  <base-page>
    <page-header showPrev showCancel>
      {{ $t('member-role-auth.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="memberRoleAuthInfo" :label="`${$t('member-role-auth.detail.card.member-role-auth-info.title')}`" />
    </base-tabs>
    <member-role-auth-info-block v-show="currentBlock === 'memberRoleAuthInfo'" :mode="mode" />
  </base-page>
</template>

<script>
import MemberRoleAuthInfoBlock from './components/member-role-auth-info-block/MemberRoleAuthInfoBlock.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    MemberRoleAuthInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup () {
    // data
    const currentBlock = ref('memberRoleAuthInfo')

    return {
      currentBlock,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

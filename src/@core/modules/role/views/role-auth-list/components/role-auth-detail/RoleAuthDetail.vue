<template>
  <base-page>
    <page-header showPrev showCancel>
      {{ $t('role-auth.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="roleAuthInfo" :label="`${$t('role-auth.detail.card.role-auth-info.title')}`" />
    </base-tabs>
    <role-auth-info-block v-show="currentBlock === 'roleAuthInfo'" :mode="mode" />
  </base-page>
</template>

<script>
import RoleAuthInfoBlock from './components/role-auth-info-block/RoleAuthInfoBlock.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    RoleAuthInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup () {
    // data
    const currentBlock = ref('roleAuthInfo')

    return {
      currentBlock,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

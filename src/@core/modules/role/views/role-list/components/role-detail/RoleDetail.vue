<template>
  <base-page>
    <page-header showPrev showCancel>
      {{ $t('role.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="roleInfo" :label="`${$t('role.detail.card.role-info.title')}`" />
    </base-tabs>
    <role-info-block v-show="currentBlock === 'roleInfo'" :mode="mode" />
  </base-page>
</template>

<script>
import RoleInfoBlock from './components/role-info-block/RoleInfoBlock.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    RoleInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup () {
    // data
    const currentBlock = ref('roleInfo')

    return {
      currentBlock,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

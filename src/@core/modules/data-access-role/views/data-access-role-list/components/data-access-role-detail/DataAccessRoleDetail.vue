<template>
  <base-page>
    <page-header showPrev showCancel>
      {{ $t('data-access-role.detail.title') }}
    </page-header>
    <base-tabs v-model="currentBlock" class="q-mb-md">
      <q-tab name="dataAccessRoleInfo" :label="`${$t('data-access-role.detail.card.data-access-role-info.title')}`" />
    </base-tabs>
    <data-access-role-info-block v-show="currentBlock === 'dataAccessRoleInfo'" :mode="mode" />
  </base-page>
</template>

<script>
import DataAccessRoleInfoBlock from './components/data-access-role-info-block/DataAccessRoleInfoBlock.vue'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    DataAccessRoleInfoBlock,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup () {
    // data
    const currentBlock = ref('dataAccessRoleInfo')

    return {
      currentBlock,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

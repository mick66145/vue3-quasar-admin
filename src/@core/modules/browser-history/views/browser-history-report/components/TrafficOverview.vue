<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="(trafficOverviewItem, trafficOverviewIndex) in trafficOverview"
      :key="trafficOverviewIndex"
      class="col-xs-12 col-md-6"
    >
      <card-social
        :title="trafficOverviewItem.key"
        bg-color="#a270b1"
        icon-bg-color="#9f52b1"
        :value="trafficOverviewItem.value"
        icon="notifications"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue-demi'
import { BrowserHistoryResource } from '@core/modules/browser-history/api'
import useCRUD from '@/hooks/useCRUD'

const browserHistoryResource = BrowserHistoryResource({})

export default defineComponent({
  setup () {
    // data
    const trafficOverview = ref([])

    // mounted
    onMounted(async () => {
      const [res] = await callTrafficOverviewFetch()
      trafficOverview.value = res.list
    })

    // methods
    const trafficOverviewFetch = () => browserHistoryResource.trafficOverview({})

    // use
    const { callReadListFetch: callTrafficOverviewFetch } = useCRUD({
      readListFetch: trafficOverviewFetch,
    })

    return {
      trafficOverview,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

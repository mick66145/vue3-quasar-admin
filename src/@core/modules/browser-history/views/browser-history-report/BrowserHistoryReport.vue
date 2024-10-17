<template>
  <base-page>
    <page-header>{{ $t('browser-history-report.title') }}</page-header>
    <div class="row q-col-gutter-md">
      <div class="col-24">
        <div class="row q-col-gutter-md">
          <div class="col-24">
            <traffic-overview />
          </div>
          <div class="col-24">
            <traffic-line-chart />
          </div>
          <div class="col-md-12 col-24">
            <browser-pie-chart />
          </div>
          <div class="col-md-12 col-24">
            <device-type-pie-chart />
          </div>
        </div>
      </div>
    </div>
  </base-page>
</template>

<script>
import TrafficOverview from './components/TrafficOverview.vue'
import TrafficLineChart from './components/TrafficLineChart.vue'
import BrowserPieChart from './components/BrowserPieChart.vue'
import DeviceTypePieChart from './components/DeviceTypePieChart.vue'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  components: {
    TrafficOverview,
    TrafficLineChart,
    BrowserPieChart,
    DeviceTypePieChart,
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped></style>

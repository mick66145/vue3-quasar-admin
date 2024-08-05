<template>
  <q-card>
    <q-card-section class="text-h6">
      流量趨勢
    </q-card-section>
    <q-card-section>
      <div ref="container" class="h-[300px]" />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue-demi'
import { BrowserHistoryResource } from '@core/modules/browser-history/api'
import useCRUD from '@/hooks/useCRUD'
import useCharts from '@/hooks/useChart'

const browserHistoryResource = BrowserHistoryResource({})

const lineChrtOption = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['瀏覽量', '訪問IP量'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '瀏覽量',
      type: 'line',
      data: [],
    },
    {
      name: '訪問IP量',
      type: 'line',
      data: [],
    },
  ],
}

export default defineComponent({
  setup () {
    // data
    const container = ref(null)

    // mounted
    onMounted(async () => {
      const [res] = await callTraffichartReportFetch()
      lineChrtOption.xAxis.data = res.list.map(item => item.date)
      lineChrtOption.series[0].data = res.list.map(item => item.traffic_count)
      lineChrtOption.series[1].data = res.list.map(item => item.ip_count)
      const { setOption, resize } = useCharts({
        element: container.value,
      })
      setOption(lineChrtOption)
      window.addEventListener('resize', () => { resize() })
    })

    // methods
    const trafficChartReportFetch = () => browserHistoryResource.trafficChartReport({})

    // use
    const { callReadListFetch: callTraffichartReportFetch } = useCRUD({
      readListFetch: trafficChartReportFetch,
    })

    return {
      container,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

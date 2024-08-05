<template>
  <q-card>
    <q-card-section class="text-h6">
      設備占比
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

const pieChartOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    top: 'bottom',
    bottom: '5%',
    left: 'center',
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '35%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
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
      const [res] = await callDeviceTypeChartReportFetch()
      res.list.forEach((element) => {
        pieChartOption.series[0].data.push({
          name: element.device_type,
          value: element.count,
        })
      })

      const { setOption, resize } = useCharts({
        element: container.value,
      })
      setOption(pieChartOption)
      window.addEventListener('resize', () => { resize() })
    })

    // methods
    const deviceTypeChartReportFetch = () => browserHistoryResource.deviceTypeChartReport({})

    // use
    const { callReadListFetch: callDeviceTypeChartReportFetch } = useCRUD({
      readListFetch: deviceTypeChartReportFetch,
    })

    return {
      container,
    }
  },
})
</script>

<style lang="postcss" scoped></style>

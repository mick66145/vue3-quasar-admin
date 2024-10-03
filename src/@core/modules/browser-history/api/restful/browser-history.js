import request from '@core/utils/request'

export const BrowserHistoryResource = ({
  uri = 'browser_history',
}) => {
  const trafficOverview = ({ query }) => {
    return request({
      url: `/${uri}/action/traffic_overview`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const { list } = res.data
        return { list: list }
      })
  }

  const browserChartReport = ({ query }) => {
    return request({
      url: `/${uri}/action/browser_chart_report`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const { list } = res.data
        return { list: list }
      })
  }

  const deviceTypeChartReport = ({ query }) => {
    return request({
      url: `/${uri}/action/device_type_chart_report`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const { list } = res.data
        return { list: list }
      })
  }

  const trafficChartReport = ({ query }) => {
    return request({
      url: `/${uri}/action/traffic_chart_report`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const { list } = res.data
        return { list: list }
      })
  }

  return {
    trafficOverview,
    browserChartReport,
    deviceTypeChartReport,
    trafficChartReport,
  }
}

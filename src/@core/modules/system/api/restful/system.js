import { OperateLogViewModel } from '@core/modules/system/models'
import request from '@core/utils/request'

export const SystemResource = ({
  uri = 'system',
}) => {
  const recordLoglist = (query) => {
    return request({
      url: `/${uri}/record_log`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const systemLogObj = OperateLogViewModel(element)
          return systemLogObj
        })
        const { list, meta } = res.data
        if (meta?.pagination) {
          const { count, total } = meta.pagination
          return {
            list: list,
            total: total,
            count: count,
          }
        } else {
          return { list: list }
        }
      },
      )
  }

  const viewCount = ({ query }) => {
    return request({
      url: `/${uri}/viewcount`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => res.data)
  }

  return {
    recordLoglist,
    viewCount,
  }
}

import Base from '@core/models/modules/Base'
import { OperateLogModel } from './OperateLogModel'

const OperateLog = () => ({
  ...Base(),
})

export const OperateLogViewModel = (item) => {
  const viewModel = (item) => {
    const operateLogObj = {
      ...OperateLogModel(item),
      ...OperateLog(),
    }
    return operateLogObj
  }

  return viewModel(item)
}

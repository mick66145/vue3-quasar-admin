import Base from '@core/models/modules/Base'
import { MailinfoModel } from './MailinfoModel'
const Mailinfo = () => ({
  ...Base(),
})

export const MailinfoViewModel = (item) => {
  const viewModel = (item) => {
    const mailinfoObj = {
      ...MailinfoModel(item),
      ...Mailinfo(),
    }
    return mailinfoObj
  }

  return viewModel(item)
}

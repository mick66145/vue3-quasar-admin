import Base from '@core/models/modules/Base'
import { MailLogModel } from './MailLogModel'

const MailLog = () => ({
  ...Base(),
})

export const MailLogViewModel = (item) => {
  const viewModel = (item) => {
    const mailLogObj = {
      ...MailLogModel(item),
      ...MailLog(),
    }
    return mailLogObj
  }

  return viewModel(item)
}

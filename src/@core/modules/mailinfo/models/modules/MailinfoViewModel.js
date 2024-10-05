import Base from '@core/models/modules/Base'
import { MailinfoModel } from './MailinfoModel'
import useDeltaConvert from '@/hooks/useDeltaConvert'
const Mailinfo = () => ({
  ...Base(),
})

export const MailinfoViewModel = (item) => {
  const viewModel = (item) => {
    const mailinfoObj = {
      ...MailinfoModel(item),
      ...Mailinfo(),
      setContent () {
        const { renderHtml } = useDeltaConvert()
        this.content = this.content_json ? renderHtml(this.content_json?.ops || []) : null
        this.content_json = JSON.stringify(this.content_json)
      },
    }
    return mailinfoObj
  }

  return viewModel(item)
}

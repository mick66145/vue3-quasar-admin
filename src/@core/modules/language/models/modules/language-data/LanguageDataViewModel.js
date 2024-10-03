import Base from '@core/models/modules/Base'
import { LanguageDataModel } from './LanguageDataModel'

const LanguageData = () => ({
  ...Base(),
})

export const LanguageDataViewModel = (item) => {
  const viewModel = (item) => {
    const languageDataObj = {
      ...LanguageDataModel(item),
      ...LanguageData(),
    }
    return languageDataObj
  }

  return viewModel(item)
}

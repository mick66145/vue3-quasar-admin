import Base from '@core/models/modules/Base'
import { LanguageContentFormModel } from './LanguageContentFormModel'

const LanguageContentForm = () => ({
  ...Base(),
})

export const LanguageContentFormViewModel = (item) => {
  const viewModel = (item) => {
    const languageContentFormObj = {
      ...LanguageContentFormModel(item),
      ...LanguageContentForm(),
    }
    return languageContentFormObj
  }

  return viewModel(item)
}

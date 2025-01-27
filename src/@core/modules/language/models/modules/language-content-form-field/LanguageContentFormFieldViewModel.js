import Base from '@core/models/modules/Base'
import { LanguageContentFormFieldModel } from './LanguageContentFormFieldModel'

const LanguageContentFormField = () => ({
  ...Base(),

  // map欄位
  row_index: null,
})

export const LanguageContentFormFieldViewModel = (item) => {
  const viewModel = (item) => {
    const languageContentFormFieldObj = {
      ...LanguageContentFormFieldModel(item),
      ...LanguageContentFormField(),
      row_index: item?.row_index || null,
    }

    return languageContentFormFieldObj
  }

  return viewModel(item)
}

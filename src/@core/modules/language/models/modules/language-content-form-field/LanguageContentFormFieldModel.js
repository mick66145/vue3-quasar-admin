
const LanguageContentFormField = () => ({
  id: null,
  label: null,
  data_key: null,
  value_type: null,
  component: null,
  i18n_key: null,
  required: false,
  disable: false,
  readonly: false,
  is_show: true,
  layout: Layout(),
  placeholder: null,
  sequence: 0,
})

const Layout = () => ({
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 24,
  '2xl': 24,
})

export const LanguageContentFormFieldModel = (item = null) => {
  const model = (item) => {
    const languageContentFormFieldObj = {
      id: item?.id || null,
      label: item?.label || null,
      data_key: item?.data_key || null,
      value_type: item?.value_type || null,
      component: item?.component || null,
      i18n_key: item?.i18n_key || null,
      required: item?.required === undefined ? false : item?.required,
      disable: item?.disable === undefined ? false : item?.disable,
      readonly: item?.readonly === undefined ? false : item?.readonly,
      is_show: item?.is_show === undefined ? true : item?.is_show,
      layout: item?.layout || Layout(),
      placeholder: item?.placeholder || null,
      sequence: item?.sequence || 0,
    }
    return languageContentFormFieldObj
  }

  return model(item || LanguageContentFormField())
}

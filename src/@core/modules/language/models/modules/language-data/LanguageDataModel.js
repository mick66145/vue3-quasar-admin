
const LanguageData = {
  id: null,
  label: null,
  data_key: null,
  usage_type: null,
  component: null,
  i18n_key: null,
  required: false,
  disable: false,
  readonly: false,
  is_show: true,
  layout: '',
  value: null,
  placeholder: null,
  locale: 'zh-TW',
  sequence: 0,
}

export const LanguageDataModel = (item = null) => {
  const model = (item) => {
    const languageDataObj = {
      id: item?.id || null,
      label: item?.label || null,
      data_key: item?.data_key || null,
      usage_type: item?.usage_type || null,
      component: item?.component || null,
      i18n_key: item?.i18n_key || null,
      required: item?.required === undefined ? false : item?.required,
      disable: item?.disable === undefined ? false : item?.disable,
      readonly: item?.readonly === undefined ? false : item?.readonly,
      is_show: item?.is_show === undefined ? true : item?.is_show,
      layout: item?.layout || '',
      value: item?.value || null,
      placeholder: item?.placeholder || null,
      locale: item?.locale || 'zh-TW',
      sequence: item?.sequence || 0,
    }
    return languageDataObj
  }

  return model(item || LanguageData)
}

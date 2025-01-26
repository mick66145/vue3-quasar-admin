
const LanguageSetting = {
  id: null,
  name: null,
  locale: 'zh-TW',
  is_enable: true,
  is_admin_enable: true,
  is_client_enable: true,
  is_default: false,
  sequence: 0,
}

export const LanguageSettingModel = (item = null) => {
  const model = (item) => {
    const languageSettingObj = {
      id: item?.id || null,
      name: item?.name || null,
      locale: item?.locale || 'zh-TW',
      is_enable: item?.is_enable === undefined ? true : item?.is_enable,
      is_admin_enable: item?.is_admin_enable === undefined ? true : item?.is_admin_enable,
      is_client_enable: item?.is_client_enable === undefined ? true : item?.is_client_enable,
      is_default: item?.is_default === undefined ? false : item?.is_default,
      sequence: item?.sequence || 0,
    }
    return languageSettingObj
  }

  return model(item || LanguageSetting)
}

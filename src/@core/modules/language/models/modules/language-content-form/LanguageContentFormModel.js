
const LanguageContentForm = {
  id: null,
  name: null,
  usage_type: null,
  fields: [],
  is_enable: true,
  sequence: 0,
}

export const LanguageContentFormModel = (item = null) => {
  const model = (item) => {
    const languageContentFormObj = {
      id: item?.id || null,
      name: item?.name || null,
      usage_type: item?.usage_type || null,
      fields: item?.fields || [],
      is_enable: item?.is_enable === undefined ? true : item?.is_enable,
      sequence: item?.sequence || 0,
    }
    return languageContentFormObj
  }

  return model(item || LanguageContentForm)
}

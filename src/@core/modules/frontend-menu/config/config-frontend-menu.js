export const frontendMenuTypes = {
  dropdown: 'dropdown',
  link: 'link',
  internal_link: 'internal_link',
}

export const frontendMenuTypeName = {
  [frontendMenuTypes.dropdown]: '下拉',
  [frontendMenuTypes.link]: '外部連結',
  [frontendMenuTypes.internal_link]: '內部連結',
}

export const frontendMenuTypeList = Object.keys(frontendMenuTypeName).map(key => ({
  label: frontendMenuTypeName[key],
  value: key,
}))

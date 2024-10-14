export const verifyCodeTypes = {
  register: 'register',
  login: 'login',
  forget_password: 'forget_password',
  bind: 'bind',
}

export const verifyCodeTypeName = {
  [verifyCodeTypes.register]: '註冊',
  [verifyCodeTypes.login]: '登入',
  [verifyCodeTypes.forget_password]: '忘記密碼',
  [verifyCodeTypes.bind]: '綁定',
}

export const verifyCodeTypeList = Object.keys(verifyCodeTypeName).map(key => ({
  label: verifyCodeTypeName[key],
  value: key,
}))

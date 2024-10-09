
const User = {
  id: null,
  name: null,
  account: null,
  password: null,
  email: null,
  is_enable: true,
  remark: null,
  role: '',
  company_job: '',
  company: '',
  data_access_roles: [],
}

export const UserModel = (item = null) => {
  const model = (item) => {
    const userObj = {
      id: item?.id || null,
      name: item?.name || null,
      account: item?.account || null,
      password: item?.password || null,
      email: item?.email || null,
      is_enable: item?.is_enable === undefined ? true : item?.is_enable,
      remark: item?.remark || null,
      role: item?.role || '',
      company_job: item?.company_job || '',
      company: item?.company || '',
      data_access_roles: item?.data_access_roles || [],
    }
    return userObj
  }

  return model(item || User)
}

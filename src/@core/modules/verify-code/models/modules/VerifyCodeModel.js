
import { convertDateTime } from '@/utils/data-convert'
const VerifyCode = () => ({
  id: null,
  created_at: null,
  updated_at: null,
  account: null,
  token: null,
  jwt_token: null,
  type: null,
  type_text: null,
  email: null,
  phone: null,
  ip: null,
})

export const VerifyCodeModel = (item = null) => {
  const model = (item) => {
    const verifyCodeObj = {
      id: item?.id || null,
      created_at: item?.created_at ? convertDateTime(item?.created_at) : convertDateTime(),
      updated_at: item?.updated_at ? convertDateTime(item?.updated_at, 'YYYY/MM/DD HH:mm:ss') : null,
      account: item?.account || null,
      token: item?.token || null,
      jwt_token: item?.jwt_token || null,
      type: item?.type || null,
      type_text: item?.type_text || null,
      email: item?.email || null,
      phone: item?.phone || null,
      ip: item?.ip || null,
    }
    return verifyCodeObj
  }

  return model(item || VerifyCode())
}

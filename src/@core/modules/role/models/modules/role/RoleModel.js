
import { convertDateTime } from '@/utils/data-convert'

const Role = {
  // api欄位
  id: null,
  created_at: null,
  name: null,
  guard_name: 'api',
  permissions: [],
}

export const RoleModel = (item = null) => {
  const model = (item) => {
    const roleObj = {
      // api欄位
      id: item?.id || null,
      created_at: item?.created_at ? convertDateTime(item?.created_at) : convertDateTime(),
      name: item?.name || null,
      guard_name: item?.guard_name || 'api',
      permissions: item?.permissions ? item?.permissions : [],
    }
    return roleObj
  }

  return model(item || Role)
}


import { convertDateTime } from '@/utils/data-convert'

const DataAccessRole = {
  // api欄位
  id: null,
  created_at: null,
  name: null,
}

export const DataAccessRoleModel = (item = null) => {
  const model = (item) => {
    const dataAccessRoleObj = {
      // api欄位
      id: item?.id || null,
      created_at: item?.created_at ? convertDateTime(item?.created_at) : convertDateTime(),
      name: item?.name || null,
    }
    return dataAccessRoleObj
  }

  return model(item || DataAccessRole)
}

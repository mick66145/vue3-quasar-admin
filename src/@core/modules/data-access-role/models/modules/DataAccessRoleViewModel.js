import Base from '@core/models/modules/Base'
import { DataAccessRoleModel } from './DataAccessRoleModel'

const DataAccessRole = () => ({
  ...Base(),
})

export const DataAccessRoleViewModel = (item) => {
  const viewModel = (item) => {
    const dataAccessRoleObj = {
      ...DataAccessRoleModel(item),
      ...DataAccessRole(),
    }
    return dataAccessRoleObj
  }

  return viewModel(item)
}

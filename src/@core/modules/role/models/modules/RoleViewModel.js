import Base from '@core/models/modules/Base'
import { RoleModel } from './RoleModel'
import { BasePermission } from '@core/modules/permission/models'

const Role = () => ({
  ...Base(),
})

export const RoleViewModel = (item) => {
  const viewModel = (item) => {
    const roleObj = {
      ...RoleModel(item),
      ...Role(),
      permissions: item?.permissions ? [...item?.permissions].map(element => {
        const permissionObj = BasePermission(element)
        return permissionObj
      }) : [],
    }
    return roleObj
  }

  return viewModel(item)
}

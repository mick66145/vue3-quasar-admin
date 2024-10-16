import Base from '@core/models/modules/Base'
import { RoleAuthModel } from './RoleAuthModel'

const RoleAuth = () => ({
  ...Base(),
})

export const RoleAuthViewModel = (item) => {
  const viewModel = (item) => {
    const roleAuthObj = {
      ...RoleAuthModel(item),
      ...RoleAuth(),
    }
    return roleAuthObj
  }

  return viewModel(item)
}

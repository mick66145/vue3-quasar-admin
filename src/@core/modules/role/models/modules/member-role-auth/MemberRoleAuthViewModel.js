import Base from '@core/models/modules/Base'
import { MemberRoleAuthModel } from './MemberRoleAuthModel'

const MemberRoleAuth = () => ({
  ...Base(),
})

export const MemberRoleAuthViewModel = (item) => {
  const viewModel = (item) => {
    const memberRoleAuthObj = {
      ...MemberRoleAuthModel(item),
      ...MemberRoleAuth(),
    }
    return memberRoleAuthObj
  }

  return viewModel(item)
}

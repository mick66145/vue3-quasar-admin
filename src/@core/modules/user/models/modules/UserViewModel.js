import Base from '@core/models/modules/Base'
import { UserModel } from './UserModel'

const User = () => ({
  ...Base(),
})

export const UserViewModel = (item) => {
  const viewModel = (item) => {
    const userObj = {
      ...UserModel(item),
      ...User(),
    }
    return userObj
  }

  return viewModel(item)
}

import Base from '@core/models/modules/Base'
import { VerifyCodeModel } from './VerifyCodeModel'

const VerifyCode = () => ({
  ...Base(),
})

export const VerifyCodeViewModel = (item) => {
  const viewModel = (item) => {
    const verifyCodeObj = {
      ...VerifyCodeModel(item),
      ...VerifyCode(),
    }
    return verifyCodeObj
  }

  return viewModel(item)
}

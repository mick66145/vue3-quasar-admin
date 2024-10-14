import useResource from '@/hooks/useResource'
import { VerifyCodeModel } from '@core/modules/verify-code/models'

export const VerifyCodeResource = ({
  uri = 'verify_code',
}) => {
  const { list, get, post, patch, destroy } = useResource({ uri, listModel: VerifyCodeModel, getModel: VerifyCodeModel })

  return {
    list,
    get,
    post,
    patch,
    destroy,
  }
}

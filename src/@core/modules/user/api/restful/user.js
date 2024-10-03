import useResource from '@/hooks/useResource'
import { UserViewModel } from '@core/modules/user/models'
import request from '@core/utils/request'

export const UserResource = ({
  uri = 'user',
}) => {
  const resetPassword = ({ id }) => {
    return request({
      url: `/${uri}/${id}/reset_password`,
      method: 'post',
    }).then(res => res.data)
  }

  const { list, get, post, patch, put, destroy, selectAll } = useResource({ uri, listModel: UserViewModel, getModel: UserViewModel })

  return {
    list,
    get,
    post,
    patch,
    put,
    destroy,
    selectAll,
    resetPassword,
  }
}

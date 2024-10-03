import useResource from '@/hooks/useResource'
import { RoleViewModel } from '@core/modules/role/models'

export const RoleResource = ({
  uri = 'role',
}) => {
  const { list, get, post, patch, put, destroy, selectAll } = useResource({ uri, listModel: RoleViewModel, getModel: RoleViewModel })

  return {
    list,
    get,
    post,
    patch,
    put,
    destroy,
    selectAll,
  }
}

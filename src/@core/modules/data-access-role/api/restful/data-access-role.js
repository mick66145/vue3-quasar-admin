import useResource from '@/hooks/useResource'
import { DataAccessRoleViewModel } from '@core/modules/data-access-role/models'

export const DataAccessRoleResource = ({
  uri = 'data_access_role',
}) => {
  const { list, get, post, patch, put, destroy, selectAll } = useResource({ uri, listModel: DataAccessRoleViewModel, getModel: DataAccessRoleViewModel })

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

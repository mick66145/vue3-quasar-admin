import useResource from '@/hooks/useResource'
import { RoleAuthViewModel } from '@core/modules/role/models'

export const RoleAuthResource = ({
  params = {},
  uri = `role/${params?.roleId}/role_auth`,
}) => {
  const { get, put } = useResource({ uri, listModel: RoleAuthViewModel })

  return {
    get,
    put,
  }
}

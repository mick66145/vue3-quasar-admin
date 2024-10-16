import useResource from '@/hooks/useResource'
import { MemberRoleAuthViewModel } from '@core/modules/role/models'

export const MemberRoleAuthResource = ({
  params = {},
  uri = `role/${params?.roleId}/member_role_auth`,
}) => {
  const { get, put } = useResource({ uri, listModel: MemberRoleAuthViewModel })

  return {
    get,
    put,
  }
}

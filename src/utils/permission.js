import { useUser } from '@/stores/user'

/**
 * @param {Array} value
 * @returns {Boolean}
 */
export default function checkPermission (value) {
  const store = useUser()
  const permissions = store.permissionList
  if (value && value instanceof Array && value.length > 0) {
    const requiredPermissions = value
    const hasPermission = permissions.some(permission => {
      return requiredPermissions.includes(permission)
    })
    return hasPermission
  } else {
    console.error('Need permissions! Like v-permission="[\'manage permission\',\'edit article\']"')
    return false
  }
}

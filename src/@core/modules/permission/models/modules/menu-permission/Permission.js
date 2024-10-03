import BasePermission from '../BasePermission'

const Permission = {
  ...BasePermission(),
  is_active: false,
}

const PermissionModel = (item = null) => {
  const model = (item) => {
    return {
      ...BasePermission(item),
      is_active: item?.is_active || false,
      setIsActive (value) {
        this.is_active = value
      },
    }
  }
  return model(item || Permission)
}

export default PermissionModel

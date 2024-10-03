const BasePermission = {
  id: '',
  name: '',
  action: '',
  display_name: '',
}

const BasePermissionModel = (item = null) => {
  const model = (item) => {
    return {
      id: item?.id || '',
      name: item?.name || '',
      action: item?.action || '',
      display_name: item?.display_name || '',
    }
  }

  return model(item || BasePermission)
}

export default BasePermissionModel

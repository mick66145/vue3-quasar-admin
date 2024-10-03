import Base from '@core/models/modules/Base'
import Permission from './Permission'

const MenuPermission = {
  ...Base(),
  // api欄位
  id: '',
  name: '',
  childs: [],
  permissions: [],

  // map欄位
  allSelectd: false,
}

const MenuPermissionModel = (item = null) => {
  const model = (item) => {
    return {
      id: item?.id || '',
      name: item?.name || '',
      childs: item?.childs ? [...item?.childs].map(element => {
        const menuPermissionObj = MenuPermissionModel(element)
        return menuPermissionObj
      }) : [],
      permissions: item?.permissions ? [...item?.permissions].map(element => {
        const permissionObj = Permission(element)
        return permissionObj
      }) : [],
      setAllSelectd () {
        this.allSelectd = this.permissions.every(element => element.is_active)
      },
      setPermission (permissions) {
        this.permissions.forEach(element => { (permissions.includes(element.id)) && (element.setIsActive(true)) })
        this.setAllSelectd()
        if (this.childs.length > 0) this.childs.forEach(element => { element.setPermission(permissions) })
      },
      onSelectAll (value) {
        this.permissions.forEach(element => { element.setIsActive(value) })
        this.setAllSelectd()
        if (this.childs.length > 0) this.childs.forEach(element => { element.onSelectAll(value) })
      },
      everyAllSelectd () {
        return this.allSelectd && (this.childs.length === 0 ? true : this.childs.every(element => element.everyAllSelectd()))
      },
      refreshAllSelectd () {
        this.setAllSelectd()
        if (this.childs.length > 0) this.childs.forEach(element => { element.refreshAllSelectd() })
      },
    }
  }

  return model(item || MenuPermission)
}

export default MenuPermissionModel

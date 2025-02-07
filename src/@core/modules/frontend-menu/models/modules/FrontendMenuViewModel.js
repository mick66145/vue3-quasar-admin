import Base from '@core/models/modules/Base'
import { FrontendMenuModel } from './FrontendMenuModel'

const FrontendMenu = () => ({
  ...Base(),
  // map欄位
  parentId: null,
})

export const FrontendMenuViewModel = (item) => {
  const viewModel = (item) => {
    const frontendMenuObj = {
      ...FrontendMenuModel(item),
      ...FrontendMenu(),
    }
    frontendMenuObj.parentId = frontendMenuObj.parent?.id || null
    return frontendMenuObj
  }

  return viewModel(item)
}

export const FrontendMenuPayloadViewModel = (item) => {
  const viewModel = (item) => {
    const frontendMenuObj = { ...item }
    frontendMenuObj.items = frontendMenuObj.items.map(frontendMenuItem => ({
      ...frontendMenuItem,
      model_type: { type: item.type, id: frontendMenuItem.id },
    }))
    return frontendMenuObj
  }
  return viewModel(item)
}

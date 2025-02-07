
import { convertDateTime } from '@/utils/data-convert'
const FrontendMenu = () => ({
  id: null,
  created_at: null,
  updated_at: null,
  name: null,
  link: null,
  type: null,
  parent: null,
  sequence: 0,
  is_link_blank: false,
  is_enable: true,
  items: [],
})

export const FrontendMenuModel = (item = null) => {
  const model = (item) => {
    const frontendMenuObj = {
      id: item?.id || null,
      created_at: item?.created_at ? convertDateTime(item?.created_at) : convertDateTime(),
      updated_at: item?.updated_at ? convertDateTime(item?.updated_at, 'YYYY/MM/DD HH:mm:ss') : null,
      name: item?.name || null,
      link: item?.link || null,
      type: item?.type || null,
      parent: item?.parent || null,
      sequence: item?.sequence || 0,
      is_link_blank: item?.is_link_blank === undefined ? false : item?.is_link_blank,
      is_enable: item?.is_enable === undefined ? true : item?.is_enable,
      items: item?.items || [],
    }
    return frontendMenuObj
  }

  return model(item || FrontendMenu())
}

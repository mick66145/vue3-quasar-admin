
/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

import { languageSettingRouter } from '@core/modules/language/router'
import { languageDataRouter } from '@core/modules/language/router'

const languageManageRouter = {
  path: '/',
  group: ['/language-setting','/language-data'],
  groupName: 'first',
  component: MainLayout,
  meta: {
    title: 'meun.language-manage',
    slug: 'dropdown',
    icon: 'menu_open',
  },
  children: [
    languageSettingRouter,
    languageDataRouter,
  ],
}

export default languageManageRouter

/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

import { languageSettingRouter } from '@core/modules/language/router'

const fullSiteSettingRouter = {
  path: '/',
  group: [
    '/language-setting'
  ],
  groupName: 'first',
  component: MainLayout,
  meta: {
    title: 'meun.full-site-setting',
    slug: 'dropdown',
    icon: 'menu_open',
  },
  children: [
    languageSettingRouter,
  ],
}

export default fullSiteSettingRouter

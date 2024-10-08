import { languageSettingRouter, languageDataRouter } from '@core/modules/language/router'

const languageManageRouter = {
  path: '/',
  group: ['/language-setting', '/language-data'],
  groupName: 'first',
  meta: {
    title: 'meun.language-manage',
    slug: 'dropdown',
    icon: 'menu_open',
    permissions: ['view language_manage'],
  },
  children: [
    languageSettingRouter,
    languageDataRouter,
  ],
}

export default languageManageRouter

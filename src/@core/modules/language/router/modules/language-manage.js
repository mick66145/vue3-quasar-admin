import { languageContentFormManageRouter, languageSettingRouter, languageDataRouter } from '@core/modules/language/router'

export const languageManageRouter = {
  path: '/',
  group: [
    '/language-content-form',
    '/language-content-form-field',
    '/language-setting',
    '/language-data',
  ],
  groupName: 'first',
  meta: {
    title: 'meun.language-manage',
    slug: 'dropdown',
    icon: 'menu_open',
    permissions: ['view language_manage'],
  },
  children: [
    languageContentFormManageRouter,
    languageSettingRouter,
    languageDataRouter,
  ],
}


/* Router Modules */
import { languageContentFormRouter } from '@core/modules/language/router'

export const languageContentFormManageRouter = {
  path: '/language-content-form',
  group: [
    '/language-content-form',
  ],
  groupName: 'second',
  meta: {
    title: 'meun.language-content-form-manage',
    slug: 'dropdown',
    icon: 'menu_open',
  },
  redirect: { name: 'LanguageContentFormList' },
  children: [
    languageContentFormRouter,
  ],
}


import { verifyCodeRouter } from '@core/modules/verify-code/router'

const securityManageRouter = {
  path: '/',
  group: [
    '/verify-code',
  ],
  groupName: 'first',
  meta: {
    title: 'meun.security-manage',
    slug: 'dropdown',
    icon: 'menu_open',
  },
  children: [
    verifyCodeRouter,
  ],
}

export default securityManageRouter

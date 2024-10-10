
/* Router Modules */
import { roleRouter } from '@core/modules/role/router'

export const roleManageRouter = {
  path: '/role-manage',
  group: [
    '/role',
  ],
  groupName: 'second',
  meta: {
    title: 'meun.role-manage',
    slug: 'dropdown',
    icon: 'menu_open',
  },
  redirect: { name: 'RoleList' },
  children: [
    roleRouter,
  ],
}

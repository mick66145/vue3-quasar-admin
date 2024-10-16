
/* Router Modules */
import { roleRouter, roleAuthRouter } from '@core/modules/role/router'

export const roleManageRouter = {
  path: '/role-manage',
  group: [
    '/role',
    '/role-auth',
  ],
  groupName: 'second',
  meta: {
    title: 'meun.role-manage',
    slug: 'dropdown',
    icon: 'menu_open',
    permissions: ['view role_manage'],
  },
  redirect: { name: 'RoleList' },
  children: [
    roleRouter,
    roleAuthRouter,
  ],
}

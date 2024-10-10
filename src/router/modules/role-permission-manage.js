
/* Router Modules */
import { roleManageRouter, memberRoleManageRouter } from '@core/modules/role/router'

const rolePermissionManageRouter = {
  path: '/',
  group: [
    '/role',
    '/member-role',
  ],
  groupName: 'first',
  meta: {
    title: 'meun.role-permission-manage',
    icon: 'menu_open',
    slug: 'dropdown',
  },
  children: [
    roleManageRouter,
    memberRoleManageRouter,
  ],
}

export default rolePermissionManageRouter

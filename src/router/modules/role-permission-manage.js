
/* Router Modules */
import { roleManageRouter, memberRoleManageRouter } from '@core/modules/role/router'

const rolePermissionManageRouter = {
  path: '/',
  group: [
    '/role',
    '/role-auth',
    '/member-role',
    '/member-role-auth',
  ],
  groupName: 'first',
  meta: {
    title: 'meun.role-permission-manage',
    icon: 'menu_open',
    slug: 'dropdown',
    permissions: ['view role_permission_manage'],
  },
  children: [
    roleManageRouter,
    memberRoleManageRouter,
  ],
}

export default rolePermissionManageRouter

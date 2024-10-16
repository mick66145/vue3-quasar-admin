
/* Router Modules */
import { memberRoleRouter, memberRoleAuthRouter } from '@core/modules/role/router'

export const memberRoleManageRouter = {
  path: '/member-role-manage',
  group: [
    '/member-role',
    '/member-role-auth',
  ],
  groupName: 'second',
  meta: {
    title: 'meun.member-role-manage',
    slug: 'dropdown',
    icon: 'menu_open',
    permissions: ['view member_role_manage'],
  },
  redirect: { name: 'MemberRoleList' },
  children: [
    memberRoleRouter,
    memberRoleAuthRouter,
  ],
}

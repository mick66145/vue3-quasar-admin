
/* Router Modules */
import { memberRoleRouter } from '@core/modules/role/router'

export const memberRoleManageRouter = {
  path: '/member-role-manage',
  group: [
    '/member-role',
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
  ],
}

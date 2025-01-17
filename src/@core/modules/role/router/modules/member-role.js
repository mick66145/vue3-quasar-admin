/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const memberRoleRouter = {
  path: '/member-role',
  name: 'MemberRole',
  component: MainLayout,
  meta: {
    title: 'member-role.title',
    slug: 'link',
    permissions: ['view member_role'],
  },
  redirect: { name: 'MemberRoleList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/role/views/member-role-list/MemberRoleList.vue'),
      name: 'MemberRoleList',
      meta: { title: 'member-role.title', icon: 'fas fa-genderless', permissions: ['view member_role'] },
    },
    {
      path: 'create',
      component: () => import('@core/modules/role/views/member-role-list/MemberRoleCreate.vue'),
      name: 'MemberRoleCreate',
      meta: { title: 'member-role.detail.title', permissions: ['create member_role'] },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@core/modules/role/views/member-role-list/MemberRoleEdit.vue'),
      name: 'MemberRoleEdit',
      meta: { title: 'member-role.detail.title', permissions: ['update member_role'] },
      hidden: true,
    },
  ],
}

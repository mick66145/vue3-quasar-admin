/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

export const memberRoleRouter = {
  path: '/member-role',
  name: 'MemberRole',
  component: MainLayout,
  meta: {
    title: 'member-role.title',
    slug: 'link',
  },
  redirect: { name: 'MemberRoleList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/role/views/member-role-list/MemberRoleList.vue'),
      name: 'MemberRoleList',
      meta: { title: 'member-role.title', icon: 'fas fa-genderless' },
    },
    {
      path: 'create',
      component: () => import('@core/modules/role/views/member-role-list/MemberRoleCreate.vue'),
      name: 'MemberRoleCreate',
      meta: { title: 'member-role.detail.title' },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@core/modules/role/views/member-role-list/MemberRoleEdit.vue'),
      name: 'MemberRoleEdit',
      meta: { title: 'member-role.detail.title' },
      hidden: true,
    },
  ],
}

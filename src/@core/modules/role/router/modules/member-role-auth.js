/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const memberRoleAuthRouter = {
  path: '/member-role-auth',
  name: 'MemberRoleAuth',
  component: MainLayout,
  meta: {
    title: 'member-role-auth.title',
    slug: 'link',
  },
  redirect: { name: 'MemberRoleAuthList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/role/views/member-role-auth-list/MemberRoleAuthList.vue'),
      name: 'MemberRoleAuthList',
      meta: { title: 'member-role-auth.title', icon: 'fas fa-genderless' },
    },
    {
      path: 'edit/:roleId(\\d+)',
      component: () => import('@core/modules/role/views/member-role-auth-list/MemberRoleAuthEdit.vue'),
      name: 'MemberRoleAuthEdit',
      meta: { title: 'member-role-auth.detail.title' },
      hidden: true,
    },
  ],
}

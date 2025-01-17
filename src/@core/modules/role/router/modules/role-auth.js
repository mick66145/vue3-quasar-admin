/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const roleAuthRouter = {
  path: '/role-auth',
  name: 'RoleAuth',
  component: MainLayout,
  meta: {
    title: 'role-auth.title',
    slug: 'link',
  },
  redirect: { name: 'RoleAuthList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/role/views/role-auth-list/RoleAuthList.vue'),
      name: 'RoleAuthList',
      meta: { title: 'role-auth.title', icon: 'fas fa-genderless' },
    },
    {
      path: 'edit/:roleId(\\d+)',
      component: () => import('@core/modules/role/views/role-auth-list/RoleAuthEdit.vue'),
      name: 'RoleAuthEdit',
      meta: { title: 'role-auth.detail.title' },
      hidden: true,
    },
  ],
}

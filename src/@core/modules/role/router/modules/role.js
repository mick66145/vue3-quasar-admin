/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const roleRouter = {
  path: '/role',
  name: 'Role',
  component: MainLayout,
  meta: {
    title: 'role.title',
    slug: 'link',
    permissions: ['view role'],
  },
  redirect: { name: 'RoleList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/role/views/role-list/RoleList.vue'),
      name: 'RoleList',
      meta: { title: 'role.title', icon: 'fas fa-genderless', permissions: ['view role'] },
    },
    {
      path: 'create',
      component: () => import('@core/modules/role/views/role-list/RoleCreate.vue'),
      name: 'RoleCreate',
      meta: { title: 'role.detail.title', permissions: ['create role'] },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@core/modules/role/views/role-list/RoleEdit.vue'),
      name: 'RoleEdit',
      meta: { title: 'role.detail.title', permissions: ['update role'] },
      hidden: true,
    },
  ],
}

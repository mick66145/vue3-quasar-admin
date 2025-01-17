/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const dataAccessRoleRouter = {
  path: '/data-access-role',
  name: 'DataAccessRole',
  component: MainLayout,
  meta: {
    title: 'data-access-role.title',
    slug: 'link',
    permissions: ['view data_access_role'],
  },
  redirect: { name: 'DataAccessRoleList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/data-access-role/views/data-access-role-list/DataAccessRoleList.vue'),
      name: 'DataAccessRoleList',
      meta: { title: 'data-access-role.title', icon: 'fas fa-genderless', permissions: ['view data_access_role'] },
    },
    {
      path: 'create',
      component: () => import('@core/modules/data-access-role/views/data-access-role-list/DataAccessRoleCreate.vue'),
      name: 'DataAccessRoleCreate',
      meta: { title: 'data-access-role.detail.title', permissions: ['create data_access_role'] },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@core/modules/data-access-role/views/data-access-role-list/DataAccessRoleEdit.vue'),
      name: 'DataAccessRoleEdit',
      meta: { title: 'data-access-role.detail.title', permissions: ['update data_access_role'] },
      hidden: true,
    },
  ],
}

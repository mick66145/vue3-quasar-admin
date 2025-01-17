/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const userRouter = {
  path: '/user',
  name: 'user',
  component: MainLayout,
  meta: {
    title: 'user.title',
    slug: 'link',
    permissions: ['view user'],
  },
  redirect: { name: 'UserList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/user/views/user-list/UserList.vue'),
      name: 'UserList',
      meta: { title: 'user.title', icon: 'fas fa-genderless', permissions: ['view user'] },
    },
    {
      path: 'create',
      component: () => import('@core/modules/user/views/user-list/UserCreate.vue'),
      name: 'UserCreate',
      meta: { title: 'user.detail.title', permissions: ['create user'] },
      hidden: true,
    },
    {
      path: 'edit/:id',
      component: () => import('@core/modules/user/views/user-list/UserEdit.vue'),
      name: 'UserEdit',
      meta: { title: 'user.detail.title', permissions: ['update user'] },
      hidden: true,
    },
  ],
}

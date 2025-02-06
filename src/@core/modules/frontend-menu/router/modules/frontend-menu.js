
/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const frontendMenuRouter = {
  path: '/frontend-menu',
  name: 'FrontendMenu',
  component: MainLayout,
  meta: {
    title: 'frontend-menu.title',
    slug: 'link',
    permissions: ['view frontend_menu'],
  },
  redirect: { name: 'FrontendMenuList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/frontend-menu/views/frontend-menu-list/FrontendMenuList.vue'),
      name: 'FrontendMenuList',
      meta: { title: 'frontend-menu.title', icon: 'fas fa-genderless', permissions: ['view frontend_menu'] },
    },
    {
      path: 'create',
      component: () => import('@core/modules/frontend-menu/views/frontend-menu-list/FrontendMenuCreate.vue'),
      name: 'FrontendMenuCreate',
      meta: { title: 'frontend-menu.detail.title', permissions: ['create frontend_menu'] },
      hidden: true,
    },
    {
      path: 'edit/:id',
      component: () => import('@core/modules/frontend-menu/views/frontend-menu-list/FrontendMenuEdit.vue'),
      name: 'FrontendMenuEdit',
      meta: { title: 'frontend-menu.detail.title', permissions: ['update frontend_menu'] },
      hidden: true,
    },
  ],
}

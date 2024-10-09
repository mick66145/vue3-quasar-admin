
/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const frontendMenuRouter = {
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
  ],
}

export default frontendMenuRouter

/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const fullSiteSettingRouter = {
  path: '/',
  group: [],
  groupName: 'first',
  component: MainLayout,
  meta: {
    title: 'meun.full-site-setting',
    slug: 'dropdown',
    icon: 'menu_open',
    permissions: ['view full_site_setting'],
  },
  children: [],
}

export default fullSiteSettingRouter

/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const mailinfoRouter = {
  path: '/mailinfo',
  name: 'Mailinfo',
  component: MainLayout,
  meta: {
    title: 'mailinfo.title',
    slug: 'link',
    permissions: ['view mailinfo_manage'],
  },
  redirect: { name: 'MailinfoList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/mailinfo/views/mailinfo-list/MailinfoList.vue'),
      name: 'MailinfoList',
      meta: { title: 'mailinfo.title', icon: 'fas fa-genderless', affix: true, permissions: ['view mailinfo_manage'] },
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@core/modules/mailinfo/views/mailinfo-list/MailinfoEdit.vue'),
      name: 'MailinfoEdit',
      meta: { title: 'mailinfo.detail.title', permissions: ['update mailinfo_manage'] },
      hidden: true,
    },
  ],
}

/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const operateLogRouter = {
  path: '/operate-log',
  component: MainLayout,
  meta: {
    title: 'operate-log.title',
    slug: 'link',
    permissions: ['view operate_log'],
  },
  redirect: { name: 'OperateLogList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/system/views/operate-log-list/OperateLogList.vue'),
      name: 'OperateLogList',
      meta: { title: 'operate-log.title', icon: 'fas fa-genderless', permissions: ['view operate_log'] },
    },
  ],
}

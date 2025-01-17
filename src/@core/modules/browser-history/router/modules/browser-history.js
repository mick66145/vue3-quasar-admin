/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

const browserHistoryRouter = {
  path: '/browser-history',
  component: MainLayout,
  meta: {
    title: 'browser-history.title',
    slug: 'link',
    permissions: ['view browser_history_report'],
  },
  redirect: { name: 'BrowserHistoryReport' },
  children: [
    {
      path: 'browser-history-report',
      component: () => import('@core/modules/browser-history/views/browser-history-report/BrowserHistoryReport.vue'),
      name: 'BrowserHistoryReport',
      meta: { title: 'browser-history-report.title', icon: 'fas fa-genderless', permissions: ['view browser_history_report'] },
    },
  ],
}

export default browserHistoryRouter

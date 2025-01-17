/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const companyJobRouter = {
  path: '/company-job',
  name: 'CompanyJob',
  component: MainLayout,
  meta: {
    title: 'company-job.title',
    slug: 'link',
    permissions: ['view company_job'],
  },
  redirect: { name: 'CompanyJobList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/company-job/views/company-job-list/CompanyJobList.vue'),
      name: 'CompanyJobList',
      meta: { title: 'company-job.title', icon: 'fas fa-genderless', permissions: ['view company_job'] },
    },
  ],
}

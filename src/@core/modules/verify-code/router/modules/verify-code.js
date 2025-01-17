
/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const verifyCodeRouter = {
  path: '/verify-code',
  name: 'VerifyCode',
  component: MainLayout,
  meta: {
    title: 'verify-code.title',
    slug: 'link',
  },
  redirect: { name: 'VerifyCodeList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/verify-code/views/verify-code-list/VerifyCodeList.vue'),
      name: 'VerifyCodeList',
      meta: { title: 'verify-code.title', icon: 'fas fa-genderless' },
    },
  ],
}

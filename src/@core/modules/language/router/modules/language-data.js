/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const languageDataRouter = {
  path: '/language-data',
  meta: {
    title: 'language-data.title',
    slug: 'link',
    permissions: ['view language_data'],
  },
  redirect: { name: 'LanguageDataList' },
  component: MainLayout,
  children: [
    {
      path: '',
      component: () => import('@core/modules/language/views/language-data-list/LanguageDataList.vue'),
      name: 'LanguageDataList',
      meta: { title: 'language-data.title', icon: 'fas fa-genderless', permissions: ['view language_data'] },
    },
    {
      path: 'create',
      component: () => import('@core/modules/language/views/language-data-list/LanguageDataCreate.vue'),
      name: 'LanguageDataCreate',
      meta: { title: 'language-data.detail.title', permissions: ['create language_data'] },
      hidden: true,
    },
    {
      path: 'edit/:id',
      component: () => import('@core/modules/language/views/language-data-list/LanguageDataEdit.vue'),
      name: 'LanguageDataEdit',
      meta: { title: 'language-data.detail.title', permissions: ['update language_data'] },
      hidden: true,
    },
  ],
}

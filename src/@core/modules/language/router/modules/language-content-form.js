/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const languageContentFormRouter = {
  path: '/language-content-form',
  meta: {
    title: 'language-content-form.title',
    slug: 'link',
  },
  redirect: { name: 'LanguageContentFormList' },
  component: MainLayout,
  children: [
    {
      path: '',
      component: () => import('@core/modules/language/views/language-content-form-list/LanguageContentFormList.vue'),
      name: 'LanguageContentFormList',
      meta: { title: 'language-content-form.title', icon: 'fas fa-genderless' },
    },
    {
      path: 'create',
      component: () => import('@core/modules/language/views/language-content-form-list/LanguageContentFormCreate.vue'),
      name: 'LanguageContentFormCreate',
      meta: { title: 'language-content-form.detail.title' },
      hidden: true,
    },
    {
      path: 'edit/:id',
      component: () => import('@core/modules/language/views/language-content-form-list/LanguageContentFormEdit.vue'),
      name: 'LanguageContentFormEdit',
      meta: { title: 'language-content-form.detail.title' },
      hidden: true,
    },
  ],
}

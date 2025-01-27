/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const languageContentFormFieldRouter = {
  path: '/language-content-form-field',
  meta: {
    title: 'language-content-form-field.title',
    slug: 'link',
  },
  redirect: { name: 'LanguageContentFormFieldList' },
  component: MainLayout,
  children: [
    {
      path: '',
      component: () => import('@core/modules/language/views/language-content-form-field-list/LanguageContentFormFieldList.vue'),
      name: 'LanguageContentFormFieldList',
      meta: { title: 'language-content-form-field.title', icon: 'fas fa-genderless' },
    },
    {
      path: 'create',
      component: () => import('@core/modules/language/views/language-content-form-field-list/LanguageContentFormFieldCreate.vue'),
      name: 'LanguageContentFormFieldCreate',
      meta: { title: 'language-content-form-field.detail.title' },
      hidden: true,
    },
    {
      path: 'edit/:id',
      component: () => import('@core/modules/language/views/language-content-form-field-list/LanguageContentFormFieldEdit.vue'),
      name: 'LanguageContentFormFieldEdit',
      meta: { title: 'language-content-form-field.detail.title' },
      hidden: true,
    },
  ],
}

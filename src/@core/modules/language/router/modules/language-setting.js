/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const languageSettingRouter = {
  path: '/language-setting',
  meta: {
    title: 'language-setting.title',
    slug: 'link',
    permissions: ['view language_setting'],
  },
  redirect: { name: 'LanguageSettingList' },
  component: MainLayout,
  children: [
    {
      path: '',
      component: () => import('@core/modules/language/views/language-setting-list/LanguageSettingList.vue'),
      name: 'LanguageSettingList',
      meta: { title: 'language-setting.title', icon: 'fas fa-genderless', permissions: ['view language_setting'] },
    },
    {
      path: 'create',
      component: () => import('@core/modules/language/views/language-setting-list/LanguageSettingCreate.vue'),
      name: 'LanguageSettingCreate',
      meta: { title: 'language-setting.detail.title', permissions: ['create language_setting'] },
      hidden: true,
    },
    {
      path: 'edit/:id',
      component: () => import('@core/modules/language/views/language-setting-list/LanguageSettingEdit.vue'),
      name: 'LanguageSettingEdit',
      meta: { title: 'language-setting.detail.title', permissions: ['update language_setting'] },
      hidden: true,
    },
  ],
}

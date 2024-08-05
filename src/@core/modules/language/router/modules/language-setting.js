
export const languageSettingRouter = {
  path: '/language-setting',
  meta: {
    title: 'language-setting.title',
    slug: 'link',
  },
  redirect: { name: 'LanguageSettingList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/language/views/language-setting-list/LanguageSettingList.vue'),
      name: 'LanguageSettingList',
      meta: { title: 'language-setting.title', icon: 'fas fa-genderless' },
    },
    {
      path: 'create',
      component: () => import('@core/modules/language/views/language-setting-list/LanguageSettingCreate.vue'),
      name: 'LanguageSettingCreate',
      meta: { title: 'language-setting.detail.title'},
      hidden: true,
    },
    {
      path: 'edit/:id',
      component: () => import('@core/modules/language/views/language-setting-list/LanguageSettingEdit.vue'),
      name: 'LanguageSettingEdit',
      meta: { title: 'language-setting.detail.title'},
      hidden: true,
    },
  ],
}

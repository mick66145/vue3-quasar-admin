
export const languageDataRouter = {
  path: '/language-data',
  meta: {
    title: 'language-data.title',
    slug: 'link',
  },
  redirect: { name: 'LanguageDataList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/language/views/language-data-list/LanguageDataList.vue'),
      name: 'LanguageDataList',
      meta: { title: 'language-data.title', icon: 'fas fa-genderless' },
    },
    {
      path: 'create',
      component: () => import('@core/modules/language/views/language-data-list/LanguageDataCreate.vue'),
      name: 'LanguageDataCreate',
      meta: { title: 'language-data.detail.title'},
      hidden: true,
    },
    {
      path: 'edit/:id',
      component: () => import('@core/modules/language/views/language-data-list/LanguageDataEdit.vue'),
      name: 'LanguageDataEdit',
      meta: { title: 'language-data.detail.title'},
      hidden: true,
    },
  ],
}

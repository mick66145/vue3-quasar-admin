import { createI18n } from 'vue-i18n'
import VxeUI from 'vxe-pc-ui'
import Cookies from 'js-cookie'
import messages from '@intlify/unplugin-vue-i18n/messages'

// locale value 要 kebab case
export const locales = {
  en: 'en',
  'zh-TW': 'zh-TW',
  'zh-CN': 'zh-CN',
  vi: 'vi',
  th: 'th',
  id: 'id',
}

export function getLanguage () {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) {
    VxeUI.setLanguage(chooseLanguage)
    return chooseLanguage
  }
  VxeUI.setLanguage('zh-TW')
  return 'zh-TW'
}

export const i18n = createI18n({
  allowComposition: true,
  locale: getLanguage(),
  fallbackLocale: locales['zh-TW'],
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
})

export default function (app) {
  app.use(i18n)
  app.config.globalProperties.$isLocale = (locale) => locale === i18n.global.locale
}

async function loadLocales (messages) {
  const quasarLocales = import.meta.glob('/node_modules/quasar/lang/*.js')
  const importQuasarLocale = async (localeCode) => {
    const localeMapping = {
      en: 'en-US',
      'zh-TW': 'zh-TW',
      'zh-CN': 'zh-CN',
      vi: 'vi',
      th: 'th',
      id: 'id',
    }
    if (localeMapping[localeCode]) {
      const localeModule = await quasarLocales[`/node_modules/quasar/lang/${localeMapping[localeCode]}.js`]()
      return localeModule.default
    }
  }
  const localePromises = Object.keys(locales).map(async localeCode => {
    const quasarLocale = await importQuasarLocale(localeCode)
    messages[localeCode] = { ...messages[localeCode], ...quasarLocale }
  })
  await Promise.all(localePromises)
}

loadLocales(messages).then(() => {
  console.log('Locales loaded:', messages)
})

import Controller from '../controller'

const languageSettingList = [
  {
    id: 2,
    name: '英文',
    locale: 'en',
    is_enable: false,
    sequence: 0,
  },
  {
    id: 1,
    name: '繁體中文',
    locale: 'zh-TW',
    is_enable: true,
    sequence: 0,
  },
]

const keywordColumn = ['name']
const languageSettingController = new Controller('api/language_setting')
languageSettingController.setList(languageSettingList)

export default [
  languageSettingController.show(),
  languageSettingController.index({ keywordColumn }),
  languageSettingController.store(),
  languageSettingController.update(),
  languageSettingController.delete(),
]

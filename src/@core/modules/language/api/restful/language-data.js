import useResource from '@/hooks/useResource'
import { LanguageDataViewModel } from '@core/modules/language/models'

export const LanguageDataResource = ({
  uri = 'language_data',
}) => {
  const { list, get, post, patch } = useResource({ uri, listModel: LanguageDataViewModel, getModel: LanguageDataViewModel })

  return {
    list,
    get,
    post,
    patch,
  }
}

import useResource from '@/hooks/useResource'
import { LanguageContentFormViewModel } from '@core/modules/language/models'

export const LanguageContentFormResource = ({
  uri = 'language_content_form',
}) => {
  const { list, get, post, patch } = useResource({ uri, listModel: LanguageContentFormViewModel, getModel: LanguageContentFormViewModel })

  return {
    list,
    get,
    post,
    patch,
  }
}

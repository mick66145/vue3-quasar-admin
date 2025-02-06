import useResource from '@/hooks/useResource'
import { FrontendMenuViewModel } from '@core/modules/frontend-menu/models'

export const FrontendMenuResource = ({
  uri = 'frontend_menu',
}) => {
  const { list, get, post, patch, destroy } = useResource({ uri, listModel: FrontendMenuViewModel, getModel: FrontendMenuViewModel })

  return {
    list,
    get,
    post,
    patch,
    destroy,
  }
}

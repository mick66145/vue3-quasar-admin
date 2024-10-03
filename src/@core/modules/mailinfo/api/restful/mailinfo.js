import useResource from '@/hooks/useResource'
import { MailinfoViewModel } from '@core/modules/mailinfo/models'

export const MailinfoResource = ({
  uri = 'mailinfo',
}) => {
  const { list, get, post, patch, put, destroy, selectAll } = useResource({ uri, listModel: MailinfoViewModel, getModel: MailinfoViewModel })

  return {
    list,
    get,
    post,
    patch,
    put,
    destroy,
    selectAll,
  }
}

import useResource from '@/hooks/useResource'
import { CompanyViewModel } from '@core/modules/company/models'

export const CompanyResource = ({
  uri = 'company',
}) => {
  const { list, get, post, patch, put, destroy, selectAll } = useResource({ uri, listModel: CompanyViewModel, getModel: CompanyViewModel })

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

import useResource from '@/hooks/useResource'
import { CompanyJobViewModel } from '@core/modules/company-job/models'

export const CompanyJobResource = ({
  uri = 'company_job',
}) => {
  const { list, get, post, patch, put, destroy, selectAll } = useResource({ uri, listModel: CompanyJobViewModel, getModel: CompanyJobViewModel })

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

import Base from '@core/models/modules/Base'
import { CompanyJobModel } from './CompanyJobModel'

const CompanyJob = () => ({
  ...Base(),
})

export const CompanyJobViewModel = (item) => {
  const viewModel = (item) => {
    const companyJobObj = {
      ...CompanyJobModel(item),
      ...CompanyJob(),
    }
    return companyJobObj
  }

  return viewModel(item)
}

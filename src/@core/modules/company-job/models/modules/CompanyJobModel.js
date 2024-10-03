
const CompanyJob = {
  id: null,
  name: null,
  parent_job: '',
}

export const CompanyJobModel = (item = null) => {
  const model = (item) => {
    const companyJobObj = {
      id: item?.id || null,
      name: item?.name || null,
      parent_job: item?.parent_job || '',
    }
    return companyJobObj
  }

  return model(item || CompanyJob)
}

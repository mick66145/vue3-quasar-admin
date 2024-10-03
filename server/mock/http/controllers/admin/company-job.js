import Controller from '../controller'

const companyJobList = [
  {
    id: 1,
    name: '助理',
    parent_job: null,
    sequence: 0,
  },
]
const keywordColumn = ['name']
const companyJobController = new Controller('api/company_job')
companyJobController.setList(companyJobList)

export default [
  companyJobController.show(),
  companyJobController.index({ keywordColumn }),
  companyJobController.store(),
  companyJobController.update(),
  companyJobController.delete(),
]

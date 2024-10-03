import Controller from '../controller'

const companyList = [
  {
    id: 1,
    name: '助理',
    parent_job: null,
    sequence: 0,
  },
]
const keywordColumn = ['name']
const companyController = new Controller('api/company')
companyController.setList(companyList)

export default [
  companyController.show(),
  companyController.index({ keywordColumn }),
  companyController.store(),
  companyController.update(),
  companyController.delete(),
]

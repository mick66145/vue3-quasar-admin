import Controller from '../controller'

const userList = [
  {
    id: 1,
    name: '網站管理員',
    account: 'admin',
    email: 'admin@admin.com',
    phone: null,
    is_enable: true,
    remark: null,
    role: {
      id: 1,
      name: '管理員',
    },
  },
  {
    id: 2,
    name: '測試',
    account: 'user1',
    email: 'aaa@aaa.aa',
    phone: null,
    is_enable: true,
    remark: null,
    role: {
      id: 1,
      name: '管理員',
    },
  },
]

const keywordColumn = ['name', 'email', 'account']
const userController = new Controller('api/user')
userController.setLastId(2)
userController.setList(userList)

export default [
  userController.show(),
  userController.index({ keywordColumn }),
  userController.store(),
  userController.update(),
  userController.delete(),
]

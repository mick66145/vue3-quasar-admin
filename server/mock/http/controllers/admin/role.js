import Controller from '../controller'

const roleList = [
  {
    id: 1,
    created_at: '2023-06-27T13:54:39+08:00',
    updated_at: '2024-01-10T13:12:56+08:00',
    name: '總管理者群組',
    permissions: [
      {
        id: 108,
        name: 'view user_manage',
        action: 'view',
      },
      {
        id: 109,
        name: 'view role',
        action: 'view',
      },
      {
        id: 110,
        name: 'create role',
        action: 'create',
      },
      {
        id: 111,
        name: 'update role',
        action: 'update',
      },
      {
        id: 112,
        name: 'delete role',
        action: 'delete',
      },
      {
        id: 117,
        name: 'view user',
        action: 'view',
      },
      {
        id: 118,
        name: 'create user',
        action: 'create',
      },
      {
        id: 119,
        name: 'update user',
        action: 'update',
      },
      {
        id: 120,
        name: 'delete user',
        action: 'delete',
      },
      {
        id: 121,
        name: 'view system_info_manage',
        action: 'view',
      },
      {
        id: 124,
        name: 'view company_job',
        action: 'view',
      },
      {
        id: 125,
        name: 'create company_job',
        action: 'create',
      },
      {
        id: 126,
        name: 'update company_job',
        action: 'update',
      },
      {
        id: 127,
        name: 'delete company_job',
        action: 'delete',
      },
      {
        id: 128,
        name: 'view company',
        action: 'view',
      },
      {
        id: 129,
        name: 'create company',
        action: 'create',
      },
      {
        id: 130,
        name: 'update company',
        action: 'update',
      },
      {
        id: 131,
        name: 'delete company',
        action: 'delete',
      },
      {
        id: 136,
        name: 'view system_log_manage',
        action: 'view',
      },
      {
        id: 137,
        name: 'view operate_log',
        action: 'view',
      },
      {
        id: 138,
        name: 'view mail_log',
        action: 'view',
      },
      {
        id: 156,
        name: 'view mailinfo',
        action: 'view',
      },
      {
        id: 157,
        name: 'update mailinfo',
        action: 'update',
      },
    ],
  },
]
const keywordColumn = ['name']
const roleController = new Controller('api/role')
roleController.setList(roleList)

export default [
  roleController.show(),
  roleController.index({ keywordColumn }),
  roleController.store(),
  roleController.update(),
  roleController.delete(),
]

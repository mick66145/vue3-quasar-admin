import Controller from '../controller'

const menuPermissionList = [
  {
    id: '37814f30-74eb-401b-8ca8-63fdafca67a9',
    name: '系統資訊管理',
    permissions: [
      {
        id: 121,
        name: 'view system_info_manage',
        action: 'view',
        display_name: '讀取',
      },
    ],
    childs: [
      {
        id: '43f5cb68-da47-4d2b-ba47-23368ef53909',
        name: '信件',
        permissions: [
          {
            id: 156,
            name: 'view mailinfo',
            action: 'view',
            display_name: '讀取',
          },
          {
            id: 157,
            name: 'update mailinfo',
            action: 'update',
            display_name: '編輯',
          },
        ],
        childs: [],
      },
    ],
  },
  {
    id: '2956195b-3580-46e8-9ed2-fb4452f4cc69',
    name: '人員管理',
    permissions: [
      {
        id: 108,
        name: 'view user_manage',
        action: 'view',
        display_name: '讀取',
      },
    ],
    childs: [
      {
        id: '1134b341-47b3-46ca-bca0-9ada30c0a4d0',
        name: '公司',
        permissions: [
          {
            id: 128,
            name: 'view company',
            action: 'view',
            display_name: '讀取',
          },
          {
            id: 129,
            name: 'create company',
            action: 'create',
            display_name: '新增',
          },
          {
            id: 130,
            name: 'update company',
            action: 'update',
            display_name: '編輯',
          },
          {
            id: 131,
            name: 'delete company',
            action: 'delete',
            display_name: '刪除',
          },
        ],
        childs: [],
      },
      {
        id: 'c9071594-ad03-4092-ad94-d8715dc6e7cd',
        name: '職稱',
        permissions: [
          {
            id: 124,
            name: 'view company_job',
            action: 'view',
            display_name: '讀取',
          },
          {
            id: 125,
            name: 'create company_job',
            action: 'create',
            display_name: '新增',
          },
          {
            id: 126,
            name: 'update company_job',
            action: 'update',
            display_name: '編輯',
          },
          {
            id: 127,
            name: 'delete company_job',
            action: 'delete',
            display_name: '刪除',
          },
        ],
        childs: [],
      },
      {
        id: '9acf95ed-ce9c-46cf-808b-43c533d7f343',
        name: '權限',
        permissions: [
          {
            id: 109,
            name: 'view role',
            action: 'view',
            display_name: '讀取',
          },
          {
            id: 110,
            name: 'create role',
            action: 'create',
            display_name: '新增',
          },
          {
            id: 111,
            name: 'update role',
            action: 'update',
            display_name: '編輯',
          },
          {
            id: 112,
            name: 'delete role',
            action: 'delete',
            display_name: '刪除',
          },
        ],
        childs: [],
      },
      {
        id: 'ce78b7b1-7bab-45bd-ac72-3aa04e5541b2',
        name: '帳號',
        permissions: [
          {
            id: 117,
            name: 'view user',
            action: 'view',
            display_name: '讀取',
          },
          {
            id: 118,
            name: 'create user',
            action: 'create',
            display_name: '新增',
          },
          {
            id: 119,
            name: 'update user',
            action: 'update',
            display_name: '編輯',
          },
          {
            id: 120,
            name: 'delete user',
            action: 'delete',
            display_name: '刪除',
          },
        ],
        childs: [],
      },
    ],
  },
  {
    id: '06db0788-8df5-4659-b0b7-076461510a10',
    name: '系統紀錄',
    permissions: [
      {
        id: 136,
        name: 'view system_log_manage',
        action: 'view',
        display_name: '讀取',
      },
    ],
    childs: [
      {
        id: 'f2a35c4c-90b6-40b6-9679-7e4bc3a93af6',
        name: '操作記錄',
        permissions: [
          {
            id: 137,
            name: 'view operate_log',
            action: 'view',
            display_name: '讀取',
          },
        ],
        childs: [],
      },
      {
        id: '65aec742-42e2-4c9c-982d-4dbf54972188',
        name: '信件記錄',
        permissions: [
          {
            id: 138,
            name: 'view mail_log',
            action: 'view',
            display_name: '讀取',
          },
        ],
        childs: [],
      },
    ],
  },
]

const menuPermissionController = new Controller('api/menu_permission')
menuPermissionController.setList(menuPermissionList)

export default [
  menuPermissionController.index({}),
]

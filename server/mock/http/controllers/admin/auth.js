const tokens = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
}
const users = {
  'admin-token': {
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
  'editor-token': {
    id: 2,
    name: '網站使用者',
    account: 'editor',
    email: 'editor@admin.com',
    phone: null,
    is_enable: true,
    remark: null,
    role: {
      id: 1,
      name: '網站使用者',
    },
  },
}
const permissions = {
  'admin-token': {
    list: [
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
}

export default [
  {
    url: '/api/auth/login',
    method: 'post',
    response: config => {
      const { account } = config.body
      const token = tokens[account]
      if (!token) {
        return {
          code: 404,
          message: 'Account and password are incorrect.',
        }
      }
      return {
        code: 200,
        data: token,
      }
    },
  },
  {
    url: '/api/auth/me',
    method: 'get',
    response: (req, res) => {
      const { authorization } = req.headers
      const token = authorization.split('Bearer ')[1]
      const info = users[token]
      if (!info) {
        return {
          code: 401,
          message: 'Unauthenticated',
        }
      }
      return {
        code: 200,
        data: info,
      }
    },
  },
  {
    url: '/api/auth/permission',
    method: 'get',
    response: (req, res) => {
      const { authorization } = req.headers
      const token = authorization.split('Bearer ')[1]
      const info = users[token]
      if (!info) {
        return {
          code: 401,
          message: 'Unauthenticated',
        }
      }
      return {
        code: 200,
        data: permissions[token],
      }
    },
  },
]

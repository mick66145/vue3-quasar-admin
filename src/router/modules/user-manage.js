
/* Router Modules */
import { companyJobRouter } from '@core/modules/company-job/router'
import { userRouter } from '@core/modules/user/router'
import { dataAccessRoleRouter } from '@core/modules/data-access-role/router'

const userManageRouter = {
  path: '/',
  group: ['/company-job', '/data-access-role', '/user'],
  groupName: 'first',
  meta: {
    title: 'meun.user-manage',
    icon: 'fas fa-solid fa-users',
    slug: 'dropdown',
    permissions: ['view user_manage'],
  },
  children: [
    companyJobRouter,
    dataAccessRoleRouter,
    userRouter,
  ],
}

export default userManageRouter


/* Router Modules */
import { companyRouter } from '@core/modules/company/router'
import { companyJobRouter } from '@core/modules/company-job/router'
import { userRouter } from '@core/modules/user/router'
import { roleRouter } from '@core/modules/role/router'
import { dataAccessRoleRouter } from '@core/modules/data-access-role/router'

const userManageRouter = {
  path: '/',
  group: ['/company-job', '/company', '/role', '/data-access-role', '/user'],
  groupName: 'first',
  meta: {
    title: 'meun.user-manage',
    icon: 'fas fa-solid fa-users',
    slug: 'dropdown',
  },
  children: [
    companyRouter,
    companyJobRouter,
    roleRouter,
    dataAccessRoleRouter,
    userRouter,
  ],
}

export default userManageRouter


/* Router Modules */
import { companyRouter } from '@core/modules/company/router'
import { companyJobRouter } from '@core/modules/company-job/router'
import { userRouter } from '@core/modules/user/router'
import { roleRouter } from '@core/modules/role/router'

const userManageRouter = {
  path: '/',
  group: ['/company-job', '/company', '/role', '/user'],
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
    userRouter,
  ],
}

export default userManageRouter

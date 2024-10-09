
/* Router Modules */
import { mailinfoRouter } from '@core/modules/mailinfo/router'
import { companyRouter } from '@core/modules/company/router'

const systemInfoManageRouter = {
  path: '/',
  group: ['/mailinfo', '/company'],
  groupName: 'first',
  meta: {
    title: 'meun.system-info-manage',
    icon: 'fa-solid fa-server',
    slug: 'dropdown',
    permissions: ['view system_info_manage'],
  },
  children: [
    mailinfoRouter,
    companyRouter,
  ],
}

export default systemInfoManageRouter

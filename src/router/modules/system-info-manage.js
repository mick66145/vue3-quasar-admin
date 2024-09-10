
/* Router Modules */
import { mailinfoRouter} from '@core/modules/mailinfo/router'

const systemInfoManageRouter = {
  path: '/',
  group: ['/mailinfo'],
  groupName: 'first',
  meta: {
    title: 'meun.system-info-manage',
    icon: 'fa-solid fa-server',
    slug: 'dropdown',
    permissions: ['view system_info_manage'],
  },
  children: [
    mailinfoRouter,
  ],
}

export default systemInfoManageRouter


/* Router Modules */
import { mailinfoRouter} from '@core/modules/mailinfo/router'

const systemInfoManageRouter = {
  path: '/',
  group: ['/mailinfo'],
  groupName: 'first',
  meta: {
    title: 'meun.system-information-manage',
    icon: 'fa-solid fa-server',
    slug: 'dropdown',
  },
  children: [
    mailinfoRouter,
  ],
}

export default systemInfoManageRouter

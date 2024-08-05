
/* Router Modules */
import { operateLogRouter } from '@core/modules/system/router'
import { mailLogRouter } from '@core/modules/mail-log/router'

const systemLogManageRouter = {
  path: '/',
  group: ['/operate-log', '/mail-log'],
  groupName: 'first',
  meta: {
    title: 'meun.system-log',
    icon: 'fa-solid fa-circle-info',
    slug: 'dropdown',
  },
  children: [
    operateLogRouter,
    mailLogRouter,
  ],
}

export default systemLogManageRouter

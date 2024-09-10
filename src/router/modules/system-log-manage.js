
/* Router Modules */
import { operateLogRouter } from '@core/modules/system/router'
import { mailLogRouter } from '@core/modules/mail-log/router'

const systemLogManageRouter = {
  path: '/',
  group: ['/operate-log', '/mail-log'],
  groupName: 'first',
  meta: {
    title: 'meun.system-log-manage',
    icon: 'fa-solid fa-circle-info',
    slug: 'dropdown',
    permissions: ['view system_log_manage'],
  },
  children: [
    operateLogRouter,
    mailLogRouter,
  ],
}

export default systemLogManageRouter

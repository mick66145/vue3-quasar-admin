
/* 如果有引入frontendMenu 就將以下註解打開 */
import { frontendMenuRouter } from '@core/modules/frontend-menu/router'

const designManageRouter = {
  path: '/',
  group: [
    /* 如果有引入frontendMenu 就將以下註解打開 */
    '/frontend-menu',
  ],
  groupName: 'first',
  meta: {
    title: 'meun.design-manage',
    slug: 'dropdown',
    icon: 'menu_open',
  },
  children: [
    /* 如果有引入frontendMenu 就將以下註解打開 */
    frontendMenuRouter,
  ],
}

export default designManageRouter

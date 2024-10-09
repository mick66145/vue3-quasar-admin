
import frontendMenuRouter from '@core/modules/frontend-menu/router'

const cmsManageRouter = {
  path: '/',
  group: [
    '/frontend-menu',
  ],
  groupName: 'first',
  meta: {
    title: 'meun.cms-manage',
    slug: 'dropdown',
    icon: 'fa-solid fa-laptop-code',
    permissions: ['view cms_manage'],
  },
  children: [
    frontendMenuRouter,
  ],
}

export default cmsManageRouter

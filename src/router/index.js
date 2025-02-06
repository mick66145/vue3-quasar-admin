import { createRouter, createWebHistory } from 'vue-router'
import { setupGuards } from './guard'

/* Layout */
import MainLayout from '@/layouts/main-layout/MainLayout.vue'
import EntryLayout from '@/layouts/entry-layout/EntryLayout.vue'

/* Router Modules */
import systemInfoManageRouter from './modules/system-info-manage'
import cmsManageRouter from './modules/cms-manage'
import designManageRouter from './modules/design-manage'
import userManageRouter from './modules/user-manage'
import rolePermissionManageRouter from './modules/role-permission-manage'
import reportManageRouter from './modules/report-manage'
import { languageManageRouter } from '@core/modules/language/router'
import securityManageRouter from './modules/security-manage'
import basicSettingRouter from './modules/basic-setting'
import fullSiteSettingRouter from './modules/full-site-setting'
import systemLogManageRouter from './modules/system-log-manage'

export const constantRoutes = [
  {
    path: '/redirect',
    component: MainLayout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/views/error-page/404.vue'),
  },
  {
    path: '/login',
    component: EntryLayout,
    redirect: { name: 'Login' },
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/entry/login/Login.vue'),
        name: 'Login',
      },
    ],
  },
  {
    path: '/register',
    component: EntryLayout,
    redirect: { name: 'Register' },
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/entry/register/Register.vue'),
        name: 'Register',
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: MainLayout,
    redirect: '/dashboard',
    meta: {
      slug: 'link',
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '/profile',
    component: MainLayout,
    redirect: '/profile',
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/profile/Profile.vue'),
        name: 'Profile',
        meta: { title: '個人資料' },
      },
    ],
  },
]

export const asyncRoutes = [
  systemInfoManageRouter,
  cmsManageRouter,
  designManageRouter,
  userManageRouter,
  rolePermissionManageRouter,
  reportManageRouter,
  languageManageRouter,
  securityManageRouter,
  fullSiteSettingRouter,
  basicSettingRouter,
  systemLogManageRouter,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
})

export function addRoutes (routes = [], { parent = '' }) {
  routes.forEach(route => {
    if (parent) {
      router.addRoute(parent, route)
    } else {
      router.addRoute(route)
    }
  })
}
setupGuards(router)
export default router

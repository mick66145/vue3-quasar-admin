import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@core/utils/auth'
import { AuthResource } from '@core/modules/auth/api'
import useLogout from '@/hooks/useLogout'

export const useUser = defineStore({
  id: 'user',
  state: () => ({
    token: getToken(),
    info: '',
    permissionList: [],
    authResource: AuthResource({}),
  }),
  actions: {
    async login (payload) {
      return this.authResource.login(payload)
        .then(res => {
          const { data } = res
          this.setToken(data.token)
          return res
        })
    },
    async register (payload) {
      /* 如果有註冊的api就使用以下註解 */
      // return this.authResource.register(payload)
      //   .then(res => {
      //     return res
      //   })
      return new Promise((resolve) => {
        resolve(true)
      })
    },
    async forgetPassword (payload) {
      /* 如果有註冊的api就使用以下註解 */
      // return this.authResource.forgetPassword(payload)
      //   .then(res => {
      //     return res
      //   })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    async getVerifyCode (payload) {
      /* 如果有註冊的api就使用以下註解 */
      // return this.authResource.getVerifyCode(payload)
      //   .then(res => {
      //     return res
      //   })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    async whoami () {
      /* 如果有取得登入使用者的api就使用以下註解 */
      return new Promise((resolve, reject) => {
        this.authResource.me()
          .then(res => {
            const { data } = res
            if (!data) {
              reject(new Error('Verification failed, please Login again.'))
            }
            this.info = { ...data }
            resolve(data)
          }).catch(error => {
            reject(error)
          })
      })
      // return new Promise((resolve) => {
      //   const data = {
      //     id: 1,
      //     name: '網站管理員',
      //     account: 'admin',
      //     email: 'admin@admin.com',
      //     remark: null,
      //   }
      //   this.info = { ...data }
      //   resolve(data)
      // })
    },

    async permission () {
      /* 如果有權限的api就使用以下註解 */
      return new Promise((resolve, reject) => {
        this.authResource.permission()
          .then(res => {
            const { list } = res
            this.permissionList = list.map(permission => { return permission.name })
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
      // return new Promise((resolve) => {
      //   resolve(true)
      // })
    },

    async profile (payload) {
      return this.authResource.profile(payload)
    },

    async changePassword (payload) {
      return new Promise((resolve, reject) => {
        return this.authResource.changePassword(payload).then(res => {
          const { resetStore } = useLogout()
          resetStore()
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    },

    async logout () {
      /* 如果有登出的api就使用以下註解 */
      // return new Promise((resolve, reject) => {
      //   return this.authResource.logout().then(res => {
      //     this.clear()
      //     resolve()
      //   })
      //     .catch(error => {
      //       reject(error)
      //     })
      // })
      this.clear()
    },

    async refreshToken (payload) {
      return this.authResource.refreshToken(payload)
        .then(res => {
          const { data } = res
          this.setToken(data.token)
          return res
        })
    },

    setToken (token) {
      setToken(token)
      this.token = token
    },

    clear () {
      this.token = ''
      removeToken()
      this.$reset()
    },
  },

})

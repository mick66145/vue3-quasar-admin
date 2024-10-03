import { defineStore } from 'pinia'
import { PlatformAttributeResource } from '@core/modules/platform-attribute/api'

export const usePlatformAttribute = defineStore({
  id: 'platformAttribute',
  state: () => ({
    platformAttributeResource: PlatformAttributeResource({}),
    platformAttribute: '',
  }),
  actions: {
    async getPlatformAttribute () {
      /* 如果有參數的api就使用以下註解 */
      return new Promise((resolve, reject) => {
        this.platformAttributeResource.get({})
          .then(res => {
            this.platformAttribute = res
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
      // return new Promise((resolve) => {
      //   resolve(true)
      // })
    },
  },

})

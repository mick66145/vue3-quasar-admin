import { defineStore } from 'pinia'
import { FrontendMenuResource } from '@core/modules/frontend-menu/api'

export const useFrontendMenuStore = defineStore({
  id: 'frontendMenuStore',
  state: () => ({
    frontendMenuResource: FrontendMenuResource({}),
  }),
  actions: {
    list ({ query }) {
      return this.frontendMenuResource.list({ query })
    },
    get ({ id, query }) {
      return this.frontendMenuResource.get({ id, query })
    },
    post ({ payload }) {
      return this.frontendMenuResource.post({ payload })
    },
    patch ({ id, payload }) {
      return this.frontendMenuResource.patch({ id, payload })
    },
    destroy ({ id }) {
      return this.frontendMenuResource.destroy({ id })
    },
  },
})

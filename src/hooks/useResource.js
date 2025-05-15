import request from '@core/utils/request'

export default function useResource ({
  uri,
  config: globalConfig = {},
  listModel = (item) => item,
  getModel = (item) => item,
  postModel = (item) => item,
  patchModel = (item) => item,
  putModel = (item) => item,
}) {
  const list = ({ query, config = {} }) => {
    return requestWithConfig({
      url: `/${uri}`,
      method: 'get',
      params: query,
      ...config,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const model = listModel(element)
          return model
        })
        const { list, meta } = res.data
        if (meta?.pagination) {
          const { count, total } = meta.pagination
          return {
            list,
            total,
            count,
          }
        } else {
          return { list }
        }
      },
      )
  }

  const get = ({ id, query, config = {} }) => {
    const url = !id ? `/${uri}` : `/${uri}/${id}`
    id && (query = { ...query, id: +id })
    return requestWithConfig({
      url,
      method: 'get',
      params: query,
      ...config,
    }).then(res => res.data)
      .then(res => {
        const model = getModel({ ...res.data })
        return model
      })
  }

  const post = ({ payload, config = {} }) => {
    return requestWithConfig({
      url: `/${uri}`,
      method: 'post',
      data: postModel(payload),
      ...config,
    }).then(res => res.data)
      .then(res => res.data)
  }

  const patch = ({ id, payload, config = {} }) => {
    payload = { ...payload, id: +id }
    return requestWithConfig({
      url: `/${uri}/${id}`,
      method: 'patch',
      data: patchModel(payload),
      ...config,
    }).then(res => res.data)
      .then(res => res.data)
  }

  const put = ({ id, payload, config = {} }) => {
    const url = !id ? `/${uri}` : `/${uri}/${id}`
    id && (payload = { ...payload, id: +id })
    return requestWithConfig({
      url,
      method: 'put',
      data: putModel(payload),
      ...config,
    }).then(res => res.data)
      .then(res => res.data)
  }

  const destroy = ({ id, query, config = {} }) => {
    query = { id: +id }
    return requestWithConfig({
      url: `/${uri}/${id}`,
      method: 'delete',
      params: query,
      ...config,
    }).then(res => res.data)
  }

  const selectAll = ({ query, config = {} }) => {
    return requestWithConfig({
      url: `/${uri}/action/select_all`,
      method: 'get',
      params: query,
      ...config,
    }).then(res => res.data)
      .then(res => {
        const { list } = res.data
        return { list }
      },
      )
  }

  const requestWithConfig = (config) => request(config, globalConfig)

  return {
    list,
    get,
    post,
    patch,
    put,
    destroy,
    selectAll,
    requestWithConfig,
  }
}

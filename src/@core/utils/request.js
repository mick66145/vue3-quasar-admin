/* eslint-disable no-unused-expressions */
import Configuration from '@/configuration'
import axios from 'axios'
import qs from 'qs'
import { useUser } from '@/stores/user'
import { getToken } from '@core/utils/auth'
import useNotify from '@/hooks/useNotify'
import useLogout from '@/hooks/useLogout'

const defaultRequestInterceptors = (config) => {
  const storeUser = useUser()
  if (config.method === 'post' && (config.headers)['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data)
  }
  if (config.method === 'get' && config.params) {
    const params = new URLSearchParams()
    Object.entries(config.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value)
      }
    })
    config.url += `?${params.toString()}`
    config.params = {}
  }
  if (storeUser.token && !config.headers['Skip-Token']) {
    config.headers['X-Token'] = getToken()
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
};
(error) => {
  console.log(error)
  Promise.reject(error)
}

export const handleError = (error) => {
  const { response } = error
  const { notifyAPIError } = useNotify()
  if (response) {
    return Promise.reject(error)
  }

  // can not receive response
  // 請求過時或者是斷網
  if (!window.navigator.onLine) {
    notifyAPIError({ message: '網絡有些問題。請重新加載' })
  } else {
    // maybe Program have some problem
    return Promise.reject(error)
  }
}

export const handleAuthError = async (error) => {
  const { status, code } = error.response
  if (status !== 401) return Promise.reject(error)
  if (code === 4010000) {
    const { resetStore } = useLogout()
    resetStore()
  }
  return Promise.reject(error)
}

export const handleResponse = async (response) => {
  return Promise.resolve(response)
}

// create an axios instance
const service = axios.create({
  baseURL: `${Configuration('backendHost')}`, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 600000, // request timeout
})

// request interceptor
service.interceptors.request.use(defaultRequestInterceptors)

service.interceptors.response.use(
  handleResponse,
  handleError,
)

service.interceptors.response.use(
  handleResponse,
  handleAuthError,
)

const request = (config, extraConfig = {}) => {
  const isUnsafeToSpread = (value) => {
    return (
      value instanceof FormData ||
    value instanceof Blob ||
    value instanceof File ||
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value) || // e.g. Uint8Array
    value instanceof URLSearchParams ||
    typeof value?.pipe === 'function' // Stream-like
    )
  }

  const getContentType = (data) => {
    if (data instanceof FormData) return 'multipart/form-data'
    if (data instanceof URLSearchParams) return 'application/x-www-form-urlencoded'
    if (typeof data === 'object') return 'application/json'
    return undefined
  }

  const data = extraConfig.data ?? config.data

  // Decide whether to merge or pass through data
  const finalData = isUnsafeToSpread(data)
    ? data
    : {
      ...(config.data || {}),
      ...(extraConfig.data || {}),
    }

  // Merge headers
  const headers = {
    ...(config.headers || {}),
    ...(extraConfig.headers || {}),
  }

  // Auto-set Content-Type if not manually provided
  if (!headers['Content-Type'] && finalData) {
    const inferredType = getContentType(finalData)
    if (inferredType) {
      headers['Content-Type'] = inferredType
    }
  }

  return service({
    ...config,
    ...extraConfig,
    headers,
    params: {
      ...(config.params || {}),
      ...(extraConfig.params || {}),
    },
    data: finalData,
  })
}

export default request

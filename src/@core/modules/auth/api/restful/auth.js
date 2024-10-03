import request from '@core/utils/request'

export const AuthResource = ({
  uri = 'auth',
}) => {
  const login = (params) => {
    return request({
      url: `/${uri}/login`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const register = (params) => {
    return request({
      url: `/${uri}/register`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const forgetPassword = (params) => {
    return request({
      url: `/${uri}/forget_password`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const getVerifyCode = (params) => {
    return request({
      url: `/${uri}/get-signup-verify-code`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const logout = () => {
    return request({
      url: `/${uri}/logout`,
      method: 'post',
    })
  }

  const refreshToken = (params) => {
    return request({
      url: `/${uri}/refresh_token`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  const me = () => {
    return request({
      url: `/${uri}/me`,
      method: 'get',
    }).then(res => res.data)
  }

  const profile = (params) => {
    return request({
      url: `/${uri}/me`,
      method: 'patch',
      data: params,
    })
  }

  const permission = () => {
    return request({
      url: `/${uri}/permission`,
      method: 'get',
    }).then(res => res.data)
      .then(res => {
        const { list, meta } = res.data
        if (meta?.pagination) {
          const { count, total } = meta.pagination
          return {
            list: list,
            total: total,
            count: count,
          }
        } else {
          return {
            list: list,
          }
        }
      })
  }

  const changePassword = (params) => {
    return request({
      url: `/${uri}/change_password`,
      method: 'post',
      data: params,
    })
  }

  return {
    login,
    register,
    forgetPassword,
    getVerifyCode,
    logout,
    refreshToken,
    me,
    profile,
    permission,
    changePassword,
  }
}

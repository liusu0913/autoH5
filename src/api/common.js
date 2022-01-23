import http from '../libs/request/index'

export default {
  getMpOpenId(data, headers) {
    return http.request({
      url: '/api/mini/common/getMpOpenId',
      method: 'post',
      data,
      headers
    })
  },
  update(data, headers) {
    return http.request({
      url: '/api/mini/user/update',
      method: 'post',
      data,
      headers
    })
  }
}

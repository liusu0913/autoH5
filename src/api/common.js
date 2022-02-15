import http from '../libs/request/index'

export default {
  getMpSign(data) {
    return http.request({
      url: '/api/mini/common/getMpSign',
      method: 'post',
      data,
    })
  },
  getMpUserInfo(data) {
    return http.request({
      url: '/api/mini/common/getMpUserMsg',
      method: 'post',
      data,
    })
  },
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

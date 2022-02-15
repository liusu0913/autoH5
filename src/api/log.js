import http from '../libs/request/index'

export default {
  createWxUser(data) {
    return http.request({
      url: '/api/log/wxuser/create',
      method: 'post',
      data,
    })
  },
  pv(data) {
    return http.request({
      url: '/api/log/pageView/create',
      method: 'post',
      data,
    })
  },
  share(data) {
    return http.request({
      url: '/api/log/pageShare/create',
      method: 'post',
      data,
    })
  }
}

<template>
  <div id="app">
    <img src="../../assets/dome1.jpg" alt="" class="dome">
  </div>
</template>

<script>
import mixins from '../../libs/mixins/common'
import { getUrlParams } from '../../utils/index'
import api from '../../api/common'
import log from '../../api/log'

export default {
  name: 'App',
  mixins: [mixins],
  async mounted() {
    this.setPageTitle('中宏护牙保齿')
    this.code = getUrlParams('code')
    this.activeId = getUrlParams('activeId')
    this.sourceJobId = getUrlParams('jobId')
    this.belongCompany = getUrlParams('belongCompany')
    this.sourceOpenId = getUrlParams('sourceOpenId')
    if (!this.code) {
      location.href = this.mpSrc
      return false
    }
    if (this.sourceOpenId) {
      log.share({
        activeId: this.activeId,
        openId: this.sourceJobId,
        jobId: this.sourceJobId,
        belongCompany: Number(this.belongCompany)
      })
    }
    const userInfo = await api.getMpUserInfo({code: this.code})
    if (userInfo.code) {
      location.href = location.href.split('&code')[0]
    }
    if (userInfo.code === 0) {
      this.openId = userInfo.data.openid
      log.createWxUser({
        activeId: this.activeId,
        unionid: userInfo.data.unionid,
        openId: userInfo.data.openid,
        name: userInfo.data.nickname,
        avatar: userInfo.data.headimgurl,
        sourceJobId: this.sourceJobId,
        belongCompany: Number(this.belongCompany),
        sourceOpenId: this.sourceOpenId
      })
      log.pv({
        activeId: this.activeId,
        openId: userInfo.data.openid,
        jobId: this.sourceJobId,
        belongCompany: Number(this.belongCompany),
        sourceOpenId: this.sourceOpenId
      })
    }
    const shareUrl = `${location.origin}${location.pathname}?activeId=${this.activeId}&jobId=${this.sourceJobId}&belongCompany=${this.belongCompany}&sourceOpenId=${this.openId}`
    api.getMpSign({
      url: location.href.split('#')[0]
    }).then(res => {
      if (res.code === 0) {
        wx.config({
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxa740aa4cf482d798', // 必填，公众号的唯一标识
          timestamp: res.data.time, // 必填，生成签名的时间戳
          nonceStr: res.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.sign,// 必填，签名
          jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData',
          ]
        });
        wx.ready(function () {
          //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({ 
            title: '陆游牙疼不是病，疼起来真要命', // 分享标题
            desc: '李白斗酒诗百篇,陆游齿痛诗千行', // 分享描述
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://img-1307195053.cos.ap-nanjing.myqcloud.com/WechatIMG4775.png', // 分享图标
            success: function () {
              // 设置成功
              console.log('updateAppMessageShareData success')
            }
          })

          wx.updateTimelineShareData({ 
            title: '分享标题', // 分享标题
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://baike-med-1256891581.file.myqcloud.com/mini_lite/production/static/test/a5.jpg', // 分享图标
            success: function () {
              // 设置成功
              console.log('updateTimelineShareData success')
            }
          })
      });         
      }
    })
  },
  data() {
    return {
      code: '',
      activeId: '',
      sourceJobId: '',
      belongCompany: '',
      sourceOpenId: '',
      openId: '',
      mpSrc: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa740aa4cf482d798&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
    }
  }
}

</script>

<style>
body, html, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.dome {
  width: 100%;
}
</style>

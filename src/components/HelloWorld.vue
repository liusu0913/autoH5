<template>
  <div class="hello">
    <!-- <button class="btn" @click="getOpenId">授权登录</button> -->
    <div v-if="isShow" class="toast">{{txt}}</div>
  </div>
</template>

<script>
import {getUrlParams} from '../utils/index'
import api from '../api/common'

export default {
  name: 'HelloWorld',
  mounted() {
    this.code = getUrlParams('code')
    this.token = getUrlParams('token')
    this.openId = getUrlParams('openid')
    this.toastShow()
    this.txt = '获取权限中...'
    this.getOpenId()
    
  },
  data() {
    return {
      openId: '',
      code: '',
      token: '',
      isShow: false,
      txt: ''
    }
  },
  methods: {
    toastShow() {
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, 2000);
    },
    getOpenId() {
      api.getMpUserInfo({
        code: this.code
      }).then(res => {
        if (res.code === 0) {
          api.update({
            openId: res.data.openid,
            avatar: res.data.headimgurl
          }, {
            Authorization: `Bearer ${this.token}`
          }).then(data => {
            if(data.code === 0) {
              uni.switchTab({
                url: '/pages/index/index'
              });
            } else {
              if (data.message) {
                this.txt = data.message
              } else {
                this.txt = 'code过期请重新进入小程序'
              }
              this.toastShow()
            }
          })
        } else {
          this.txt = 'code过期请重新进入小程序'
          this.toastShow()
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 100%;
}
.btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  vertical-align: top;
  outline: none;
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  padding: 6px 20px;
  background-color: #56c38c;
  border-radius: 20px;
}
.toast {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 5px 10px;
  background-color: rgba(0,0,0,.5);
  color: #fff;
  border-radius: 10px;
  transform: translate(-50%, -50%);
}
</style>






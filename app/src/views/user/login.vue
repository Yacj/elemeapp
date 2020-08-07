<template>
  <div id="login">
    <div class="logo">
      <img src="../../assets/img/logo.jpg" alt="">
    </div>
    <van-cell-group class="input_group">
      <van-field
          name="手机号"
          maxlength="11"
          v-model="phone"
          placeholder="请输入手机号"
          clearable
      />
      <van-field
          v-model="code"
          center
          clearable
          placeholder="请输入短信验证码"
      >
        <van-button slot="button"
                    size="small"
                    type="primary"
                    color="#1989fa"
                    :disabled="sendCodeDis"
                    @click="sendCode"
        >
          {{sendBtnText}}
        </van-button>
      </van-field>
    </van-cell-group>
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <div style="margin: 20px;">
      <van-button
          :disabled="isLogin === false"
          round
          block
          type="info"
          native-type="submit"
          @click="userLogin">
        登录
      </van-button>
    </div>
  </div>
</template>

<script>
import {isPhone} from "@/util/util";
import {Notify} from 'vant';
import {User} from "@/api/user/user";

export default {
  name: "login",
  data() {
    return {
      phone: '',
      code: '',
      sendCodeDis: false,
      sendBtnText: '发送验证码',
    }
  },
  computed: {
    isLogin() {
      return this.phone !== "" && this.code !== ""
    }
  },
  methods: {
    sendCode() {
      let phone = this.phone
      let ss = 6;
      console.log(phone)
      if (phone === '' || !isPhone(phone)) {
        return Notify('请输入正确的手机号码')
      }
      this.sendBtnText = ss + 's';
      this.sendCodeDis = true;
      let timer = setInterval(() => {
        ss = ss - 1;
        this.sendBtnText = ss + 's'
        if (this.sendBtnText === '0s') {
          clearInterval(timer)
          this.sendBtnText = "发送验证码"
          this.sendCodeDis = false
        }
      }, 1000);
    },
    userLogin() {
      let phone = this.phone;
      let code = this.code
      if (phone === '' || !isPhone(phone)) {
        return Notify('手机号码错误，请重新填写')
      }
      if (code === '') {
        return Notify('验证码不能为空')
      }
      let data = {
        phone,
        code
      }
      console.log(data)
      User.login(data).then((res) => {

      })
      // Notify({type: 'success', message: '登录成功'});
      // cookie.setCookie('token','token',365)
      // this.$router.back()
    },
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .van-hairline--top-bottom::after {
    border: none;
  }

  .van-field {
    margin: 15px 0;
  }
}

#login {
  position: relative;
  padding: 15px;
  color: #333;
  height: 100vh;
  background: #fff;

  .logo {
    text-align: center;
    line-height: 0.8rem;
    margin-top: 20px;

    img {
      width: 200px;
    }
  }

  .input_group {
    margin: 50px 0 45px 0;
    text-align: left;
  }

}

.login_des {
  color: #aaa;
  line-height: 22px;
  margin-top: 20px;

  span {
    color: #4d90fe;
  }
}
</style>
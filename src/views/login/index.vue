<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{title}}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container iconfont icon-ios-person"></span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="账号/手机号/邮箱"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container iconfont icon-ios-lock"></span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <i :class="['iconfont', passwordType ? 'icon-ios-eye-off' : 'icon-ios-eye']"></i>
        </span>
      </el-form-item>
      <div>
        <el-row>
          <el-col :span="4">
            <el-checkbox style="line-height:32px;" v-model="checked">记住密码</el-checkbox>
          </el-col>
          <el-col :offset="16" :span="4" style="text-align: right">
            <el-button
              type="primary"
              :loading="loading"
              @click.native.prevent="handleLogin"
            >{{btnTxt}}</el-button>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import cookie from "js-cookie";

export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("输入的密码至少6位字符！"));
      } else {
        callback();
      }
    };
    return {
      title: "通用后台系统",
      btnTxt: "登录",
      checked: true,
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      otherQuery: {}
    };
  },
  created() {
    const _this = this;
    const infostr = cookie.get("userinfo");
    if (infostr) {
      const obj = JSON.parse(infostr);
      _this.loginForm.username = obj.username;
      _this.loginForm.password = obj.password;
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      const _this = this;
      _this.$refs.loginForm.validate(valid => {
        if (valid) {
          _this.loading = true;
          _this.loginForm["checked"] = _this.checked;
          _this.$store
            .dispatch("userlogin", _this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              _this.loading = false;
            })
            .catch(() => {
              _this.$message({ message: "表单提交异常！", type: "error" });
              _this.loading = false;
            });
        } else {
          _this.$message({ mesage: "表单提交失败！", type: "error" });
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 24px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    & > i {
      font-size: 24px;
    }
  }
}
</style>

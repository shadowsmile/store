<template>
  <div class="login">
    <ul class="nav-list">
      <template v-if="!isLogin">
        <li><el-button type="text" @click="dialogLoginVisible = true" class="nav-item">登录</el-button></li>
        <li class="nav-pile">|</li>
        <li><el-button type="text" @click="dialogSignupVisible = true" class="nav-item">注册</el-button></li>
      </template>

      <template v-else>
        <li><el-button type="text" class="nav-item">{{ user }}</el-button></li>
        <li>
          <el-popover
            placement="bottom"
            width="200"
            v-model="popoverLogoutVisible">
            <p>确定退出登录？</p>
            <div style="text-align: right; margin: 0">
              <el-button type="text" size="mini" @click="popoverLogoutVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="logout">确定</el-button>
            </div>
            <el-button slot="reference" type="text" class="nav-item">&nbsp;退出</el-button>
          </el-popover>
        </li>
        <li class="nav-pile">|</li>
        <li><el-button type="text" class="nav-item" icon="el-icon-goods" @click="gotoOrderList">购物车</el-button></li>
      </template>

      <li class="nav-pile">|</li>
      <li><el-button type="text" @click="dialogAboutVisible = true" class="nav-item">关于</el-button></li>
    </ul>

    <el-dialog
      title="登录"
      :visible.sync="dialogLoginVisible"
      :close-on-click-modal="false"
      @close="loginClose">
      <el-form :model="loginForm">
        <el-form-item label="用户名">
          <el-input v-model.trim="loginForm.username">
            <el-popover
              v-if="errorContext.username"
              slot="append"
              placement="top"
              width="150"
              trigger="hover"
              :content="errorContext.username"
              popper-class="popper-warning">
              <el-button slot="reference" icon="el-icon-warning"></el-button>
            </el-popover>
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model.trim="loginForm.password" show-password>
            <el-popover
              v-if="errorContext.password"
              slot="append"
              placement="top"
              width="150"
              trigger="hover"
              :content="errorContext.password"
              popper-class="popper-warning">
              <el-button slot="reference" icon="el-icon-warning"></el-button>
            </el-popover>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogLoginVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="注册"
      :visible.sync="dialogSignupVisible"
      :close-on-click-modal="false"
      @close="signupClose">
      <el-form :model="signupForm">
        <el-form-item label="用户名">
          <el-input v-model.trim="signupForm.username">
            <el-popover
              v-if="errorContext.username"
              slot="append"
              placement="top"
              width="150"
              trigger="hover"
              :content="errorContext.username"
              popper-class="popper-warning">
              <el-button slot="reference" icon="el-icon-warning"></el-button>
            </el-popover>
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model.trim="signupForm.password" show-password>
            <el-popover
              v-if="errorContext.password"
              slot="append"
              placement="top"
              width="150"
              trigger="hover"
              :content="errorContext.password"
              popper-class="popper-warning">
              <el-button slot="reference" icon="el-icon-warning"></el-button>
            </el-popover>
          </el-input>
        </el-form-item>
        <el-form-item label="密码确认">
          <el-input v-model.trim="signupForm.passwordConfirm" show-password>
            <el-popover
              v-if="errorContext.passwordConfirm"
              slot="append"
              placement="top"
              width="150"
              trigger="hover"
              :content="errorContext.passwordConfirm">
              <el-button slot="reference" icon="el-icon-warning"></el-button>
            </el-popover>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogSignupVisible = false">取 消</el-button>
        <el-button type="primary" @click="signup">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="关于"
      :visible.sync="dialogAboutVisible"
      :close-on-click-modal="false">
      <span>我的第一个SPA——简单的商城</span>
      <div slot="footer">
        <el-button type="primary" @click="dialogAboutVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin: false,
      user: '',
      dialogLoginVisible: false,
      dialogSignupVisible: false,
      dialogAboutVisible: false,
      popoverLogoutVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      signupForm: {
        username: '',
        password: '',
        passwordConfirm: ''
      },
      errorContext: {
        username: '',
        password: ''
      },
      userInfo: [
        {
          username: 'admin',
          password: '123456'
        },
        {
          username: 'dee',
          password: 'dee'
        }
      ]
    }
  },
  methods: {
    loginClose () {
      this.loginForm = { username: '', password: '' }
      this.errorContext = { username: '', password: '' }
    },
    login () {
      this.errorContext = { username: '', password: '' }
      if (!this.loginForm.username || !this.loginForm.password) {
        if (!this.loginForm.username) {
          this.errorContext.username = '请输入用户名！'
        }
        if (!this.loginForm.password) {
          this.errorContext.password = '请输入密码！'
        }
      } else {
        const user = this.userInfo.find((user) => {
          return user.username === this.loginForm.username
        })
        if (!user) {
          this.errorContext.username = '用户名不存在！'
        } else if (user.password !== this.loginForm.password) {
          this.errorContext.password = '密码错误！'
        } else {
          this.dialogLoginVisible = false
          this.isLogin = true
          this.user = this.loginForm.username
          this.$emit('change', this.loginForm)
        }
      }
    },
    signupClose () {
      this.signupForm = { username: '', password: '', passwordConfirm: '' }
      this.errorContext = { username: '', password: '', passwordConfirm: '' }
    },
    signup () {
      this.errorContext = { username: '', password: '', passwordConfirm: '' }
      if (!this.signupForm.username || !this.signupForm.password || !this.signupForm.passwordConfirm) {
        if (!this.signupForm.username) {
          this.errorContext.username = '请输入用户名！'
        }
        if (!this.signupForm.password) {
          this.errorContext.password = '请输入密码！'
        }
        if (!this.signupForm.passwordConfirm) {
          this.errorContext.passwordConfirm = '请输入密码！'
        }
      } else {
        if (this.signupForm.password !== this.signupForm.passwordConfirm) {
          this.errorContext.passwordConfirm = '密码不正确！'
        } else {
          this.userInfo.push({'username': this.signupForm.username, 'password': this.signupForm.password})
          this.dialogSignupVisible = false
          this.isLogin = true
          this.user = this.signupForm.username
          this.$emit('change', this.signupForm)
        }
      }
    },
    logout () {
      this.popoverLogoutVisible = false
      this.isLogin = false
      this.$emit('change', { username: '', password: '' })
    },
    gotoOrderList () {
      this.$router.push({ path: '/order' })
    }
  }
}
</script>

<style scoped>
.nav-list {
  overflow: hidden;
}
li {
  cursor: pointer;
  float: left;
}
.nav-item {
  color: #eee;
}
.nav-pile {
  padding: 0 10px;
  color: #eee;
}
.errorMsg {
  color: #f56c6c;
}
.login >>> .el-input-group__append {
  background-color: #fff;
  color: #f56c6c;
}
.login >>> .el-dialog {
  width: 400px;
  padding: 0 20px 10px 20px;
}
.login >>> .el-dialog>div {
  padding: 0;
}
.el-form {
  padding: 0 10px;
}
.el-form-item >>> .el-form-item__label {
  width: 70px;
  text-align: left;
}
.el-input {
  width: 270px;
}
</style>

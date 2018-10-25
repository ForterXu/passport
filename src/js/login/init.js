import '../common/polyfill'
import bindEvent from './event'
import render from './render'

const login = (opts = {}) => {
  // 默认参数
  const defaultOpts = {
    loginBtnText: "登录",
    accountLabel: "用户名",
    accountPlaceholder: "手机/邮箱/账号",
    passwordLabel: "密码",
    passwordPlaceholder: "请输入密码",
    autoComplete: true,
    isRemember: false,
    forgetURL: 'forget.html',
    registerURL: 'register.html',
    fetchOpts: {
      url: '/login',
      opts: {
        headers: {
          "content-Type": "application/x-wwww-form-urlencode"
        }
      }
    }
  }
  // 合并参数
  let options = Object.assign(defaultOpts, opts)
  // 渲染
  render(options)
  // 绑定事件
  bindEvent(options)
}

export { login }
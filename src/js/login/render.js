import { getId } from '../common/utils'
const template = (opts = {}) => {

  // 兼容Chrome的非自动填充
  const noAutoComplete = `
    <div id="no-autocomplete">
      <input type="text" />
      <input type="password" />
    </div>
  `
  // 兼容性的适配器
  const noAutoCompleteAdapter = opts.autoComplete ? ' ' : noAutoComplete

  // 是否设置自动填充
  const isAutoComplete = opts.autoComplete ? "on" : "off"

  const showRemember = opts.isRemember ? "block" : "none"

  // 一个表单Form中包含两个输入组就不会自动填充
  const tpl = `
    <div id="passport-login-wrapper">
      <form id="passport-login-form" onsubmit="return false">
        ${ noAutoCompleteAdapter }
        <label class="passport-account-wrapper">
          <span class="passport-account-label">${opts.accountLabel}</span>
          <input id="login-account"
              name="account" type="text"
              placeholder="${opts.accountPlaceholder}" 
              autocomplete="${isAutoComplete}" valid="present, mobile, telphone, email" />
          <span id="passport-account-clear" class="passport-account-clear" />
        </label>

        <label class="passport-password-wrapper">
          <span class="passport-password-label">${opts.passwordLabel}</span>
          <input id="login-password"
              name="password" type="password" 
              placeholder="${opts.passwordPlaceholder}"
              autocomplete="${isAutoComplete}" valid="present" />
        </label>

        <label class="passport-login-error-wrapper" id="login-error" >
        </label>

        <label class="passport-remember-wrapper" style="display: ${ showRemember }" >
          <span>记住密码：</span>
          <input id="passport-login-remember" name="remember" type="checkbox" /> 
        </label>

        <input id="passport-login-btn"
          type="submit" value="${opts.loginBtnText}" />

        <label class="passport-extra-wrapper" > 
          <a herf="${ opts.forgetURL }" target="_blank" >忘记密码</a>
          <a herf="${ opts.registerURL }" target="_blank" >免费注册</a>
        </label>
      </form>
    </div>
  `
  return tpl
}

export default (conf = {}) => {
  // 创建登录模版并插入到container中间
  conf.container.innerHTML = template(conf)
  // 兼容Chrome关闭自动填充的适配
  let $noAutoComplete = getId("no-autocomplete")
  if($noAutoComplete) {
    $noAutoComplete.style.opacity = "0"
    $noAutoComplete.style.height = "0"
  }
}
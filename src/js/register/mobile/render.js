const template = (opts = {}) => {
  return `
    <style>
    .passport-register-dialog {
      display: none;
      position: fixed;
      left: 0;
      top: 30%;
    }
    </style>
    <div id="passport-register-mobile-wrapper"
        class="passport-register-mobile-wrapper" >

        <form class="passport-register-mobile-form" id="passport-register-mobile-form" onsubmit="return false">
          <label>
            <span>手机号: </span>
            <input type="text" id="register-mobile-input" valid="mobile, present" placehodler="${opts.mobilePlaceholder || ''}" />
          </label>
          <label>
            <span>验证: </span>
            <div id="passport-register-verify-wrapper"></div>
          </label>
          <input id="passport-register-verify-btn" class="disabled" disabled type="submit" value="${opts.registerVerifyText || '下一步'}" />
        </form>

        <div class="passport-register-dialog" id="passport-register-dialog">
          <div  class="passport-register-dialog-header" >
            <div class="passport-register-dialog-close" id="passport-register-dialog-close" >
            </div>
          </div>
          <p class="register-dialog-tip" >
            验证码已发送到您的手机，15分钟内有效，请勿遗漏。
          </p>

          <form class="passport-register-verify-form" id="passport-register-verify-form" onsubmit="return false">
            <label> 
              <span>手机号: </span>
              <div id="register-verify-mobile"></div>
            </label>
            <label>
              <span>验证码: </span>
              <input type="text" name="verify" valid="present" id="register-verify-input" />
            </label>
            <input type="submit" value="确认" id="register-verify-mobile-btn" class="disabled" disabled />
          </form> 
        </div>
    </div>
  `
}

export default (conf) => {
  // 渲染插入页面
  conf.container.innerHTML = template(conf)
}
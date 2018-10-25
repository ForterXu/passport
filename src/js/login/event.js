import { getId as $ } from '../common/utils'
import { fetchPost } from '../common/fetch'
import { check } from '../common/form-check'

export default (opts = {}) => {
  
  // 拿到全部的dom
  const $loginForm = $('passport-login-form') 
  const $loginBtn = $('passport-login-btn')
  const $loginAccount = $('login-account') 
  const $loginPassword = $('login-password') 
  const $accountClear = $('passport-account-clear') 
  const $loginRemember = $('passport-login-remember')
  const $error = $('login-error')

  /*
  **点击或回车登录
  */
  $loginForm.onsubmit = async (e) => {
    e.preventDefault(e)

    // 表单验证
    const checkResult = check($loginForm)

    if(!checkResult.length) {
      // 是否记住密码　参数
      let remember = '0'
      if($loginRemember.getAttribute('checked'))
        remember = '1'
  
      // 拿到使用者参数列表
      const fetchOpts = opts.fetchOpts
  
      const res = await fetchPost(fetchOpts.url, {
        account: $loginAccount.value,
        password: $loginPassword.value,
        remember
      }, fetchOpts)
  
      if(res.code !== '200') {
        $error.innerHTML = `<span>${res.message}</span>`
      }
    }
    else {
      // 表单验证错误信息　展示
      checkResult.forEach(item => {
        $error.innerHTML = `<span>${item.message}</span>`
      })
    }


  }

  // 用户名输入　显示清除按钮
  $loginAccount.oninput = () => {
    // 显示清除按钮
    if($loginAccount.value.length) {
      $accountClear.style.display = "block"
    }
    else {
      $accountClear.style.display = "none"
    }

    $error.innerHTML = ''
  }

  // 清除用户名
  $accountClear.onclick = () => {
    $loginAccount.value = ''
    $accountClear.style.display = "none"
  }

  $loginPassword.oninput = () => {
    $error.innerHTML = ''
  }
}
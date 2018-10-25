import { Slider } from '../../common/slider'
import { getId as $,addClass,removeClass } from '../../common/utils'
import { fetchPost } from '../../common/fetch'
import { check } from '../../common/form-check'

export default (conf) => {
  let mobileVerifyToken
  const $mobileForm = $('passport-register-mobile-form')
  const $verifyBtn = $('passport-register-verify-btn')
  const $mobileInput = $('register-mobile-input')
  const $dialog = $('passport-register-dialog')
  const $dialogClose = $('passport-register-dialog-close')
  const $verifyMobile = $('register-verify-mobile')
  const $verifyInput = $('register-verify-input')
  const $mobileBtn = $('register-verify-mobile-btn')
  const $verifyForm = $('passport-register-verify-form')
  // 调用活人验证模块
  const slider = new Slider( {
    container: $('passport-register-verify-wrapper'),
    // 成功回调
    success:  async ($wrapper, $text, offsetArr) => {
      // 格式化偏移数据
      const offsetMsg = offsetArr.join(';')
      const data = await fetchPost('/getMobileVerifyToken', { offsetMsg })

      if(data.code === 200) {
        mobileVerifyToken = data.mobileVerifyToken
        addClass($wrapper, 'success')
        $text.innerHTML = '验证成功' 
      }
      else {
        addClass($wrapper, 'failed')
        $text.innerHTML = '验证失败' 
      }
      // 设置verifybtn可按
      $verifyBtn.removeAttribute('disabled')
      removeClass($verifyBtn, 'disabled')
    }
  } )
  // 提交手机号
  $verifyBtn.onclick = async () => {
    // 表单验证，然后发起请求
    const checkRes = check($mobileForm)
    // console.log(checkRes)
    if(!checkRes.length) {
      const data = await fetchPost('/getVerifyCode', {
        mobile: $mobileInput.value,
        mobileVerifyToken
      })
      if(data.code === 200) {
        // 请求成功 显示提示框 重置Token
        $dialog.style.display = 'block'
        $verifyMobile.innerHTML = data.mobile
        mobileVerifyToken = ''
        slider.reset()  
      }else {
        // 容错
        alert('验证失败')
      }
    }else {
      //容错
      let type = checkRes[0].errorArr[0].type
      if(type === 'present') 
        alert('请填写手机号')
      else if(type === 'mobile')
        alert('请填写正确的手机号')
      
    }
  }
  //填写验证码
  $dialogClose.onclick = () => {
    // 关闭按钮
    $dialog.style.display = 'none'
    mobileVerifyToken = ''    
    slider.reset()  
  }
  // 输入六位
  $verifyInput.oninput = () => {
    const MAXLEN = 6
    let value = $verifyInput.value
    // 替换非数字
    $verifyInput.value = value.replace(/\D/g, '')
    if($verifyInput.value.length >= MAXLEN) {
      // 大于六位可点击
      $mobileBtn.removeAttribute('disabled')
      removeClass($mobileBtn, 'disabled')
      if(value.length > MAXLEN) {
        $verifyInput.value = value.substring(0, MAXLEN)
      }
    }else {
      $mobileBtn.setAttribute('disabled', 'disabled')
      addClass($mobileBtn, 'disabled')
    }
  }

  // 提交
  $mobileBtn.onclick = async () => {
    // 表单验证
    let checkRes = check($verifyForm)
    if(!checkRes.length) {
      // 验证成功
      // 发起请求
      const data = await fetchPost('/checkVerifyCode', {
        mobile:  $verifyMobile.innerText,
        verifyCode: $verifyInput.value,
        mobileVerifyToken
      })
      if(data.code === 200) {
        console.log(data.message)
        conf.success && conf.success(data.Token)
      }else {
        alert(data.message)
      }

    }else {
      // 容错
      let type = checkRes[0].errorArr[0].type
      if(type === 'present') 
        alert('请填写验证码')
    }

  }
}


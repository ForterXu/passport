import FetchMock from 'fetch-mock'

// 模拟fetch请求的数据返回
FetchMock.mock('/login', (url, opts) => {
  let params = opts.params

  if(params.account === '18569524501') {
    if(params.password === '123456'){
      return { code: 200, message: 'succses' }
    }
    else {
      return { code: 401, message: "密码错误" }
    }
  }
  else {
    return { code: 400, message: "用户名错误" }
  }
})

FetchMock.mock('/getMobileVerifyToken', {code: 200, mobileVerifyToken: 'is123456', message: "验证成功"})

FetchMock.mock('/getVerifyCode', (url, opts) => {
  let params = opts.params
  if(params.mobileVerifyToken === 'is123456') 
    return { code: 200, mobile: params.mobile, message: '验证成功' } 
  else 
    return { code: 400, message: 'Token Error' }
})

FetchMock.mock('/checkVerifyCode', (url, opts) => {
  let params = opts.params
  if(params.mobile === '18569524501' && params.verifyCode === '123456') 
    return { code: 200, Token: params.mobileVerifyToken, message: '验证成功' } 
  else 
    return { code: 400, message: '验证码错误' }
})
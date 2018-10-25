
// 封装一个fetch的POST请求
const fetchPost = (url, params, opts) => {
  return fetch(url, {
    method: 'POST',
    header: {
      "content-Type": "application/x-wwww-form-urlencode"
    },
    credentials: 'include',
    params
  }).then((res) => {
    if(!res.ok) 
      throw Error(res.statusText)

    return res.json()
  })
}

export { fetchPost }
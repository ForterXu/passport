/*
**返回一个函数
** <input valid="mobile, " />
*/

const check = (form) => {
  // 安全模式
  if( !form || !form.elements )
    return 
  // 拿到表单中的输入项
  let eles = form.elements
  // 验证规则，返回数据类型
  /*
  **{
  **  type: 'present',
  **  message: '必填'
  **  }
  */
  let rules = {
    mobile: (v) => {
      return
    },
    email: (v) => {
      return
    },
    present: (v) => {
      if(!v.trim()) {
        return {
          type: 'present',
          message: '必填'
        }
      }
    }
  }

  /*{
  **  dom: item,
  **  errorArr,
  **  name: item.name,
  **  message: errorArr[0].message
  **}
  */
  let checkRes = []

  Array.from(eles).filter( item => {
    // 过滤出包含验证规则的输入框
    return item.getAttribute('valid')
  } ).map( item => {
    // 遍历每一项
    // 获取规则列表
    let valids = item.getAttribute('valid').split(', ')
    // 拿到输入值value
    let value = item.value
    // 存放结果
    let errorArr = []
    valids.forEach(valid => {
      // 表单验证
      if(rules[valid]) {
        let res = rules[valid](value)
        res && errorArr.push(res)
      }
    })

    if(errorArr.length) {
      checkRes.push({
        dom: item,
        errorArr,
        name: item.name,
        message: errorArr[0].message
      })
    }

  } )

  return checkRes
}

export { check }
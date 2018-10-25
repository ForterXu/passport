import '../../common/polyfill'
import  render from './render'
import bindEvent from './event'

const regMobile = (opts = {}) => {
  const defaultOpts = {

  }
  // 合并参数
  const options = Object.assign(defaultOpts, opts)

  // 渲染
  render(options)
  // 绑定事件
  bindEvent(options)
}

export { regMobile }
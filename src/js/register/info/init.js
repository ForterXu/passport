import '../../common/polyfill'
import  render from './render'
import bindEvent from './event'

const info = (opts) => {
  defaultOpts = {

  }
  const options = Object.assign(opts, defaultOpts)
  // 渲染
  render(options)
  // 绑定事件
  bindEvent(options)
}

export { info }
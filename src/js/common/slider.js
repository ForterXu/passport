import { getId as $,getWidth } from './utils'

// 创建ｋｅｙ
const render = Symbol('render')
const event = Symbol('event')
let style = `<style>
  .vs-wrapper {
    position: relative;
    height: 40px;
    width: 200px;
  }
  .vs-wrapper .vs-moved-bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    background-color: green;
  }
  .vs-wrapper .vs-move-btn {
    z-index: 10;
    position: absolute;
    display: block;
    height: 40px;
    width: 40px;
    background-color: blue;
  }
  .vs-wrapper .vs-unmoved-bg {
    height: 40px;
    width: 100%;
    background-color: grey;
  }
  .vs-wrapper .vs-text {
    z-index: 1;
    font-size: 14px;
    line-height: 40px;
    position: absolute;
    top: 0;
    left: 10px;
  }
</style>`

class Slider {
  constructor(opts) {
    this.opts = opts
    if(!opts.container){
      throw 'container未配置'
    } 
    else {
      this[render](opts)
      this[event](opts)
    }  

  }
  // Symbol创建的key值是独一无二的　在外部无法直接访问此方法　也无法重写方法　达到了方法的私有化
  [render](opts) {

    const unsuccessTip = opts.unsuccessTip || '请滑动滑块以验证'

    const tpl = style + `
      <div id="vs-wrapper" class="vs-wrapper" >
        <div id="vs-moved-bg" class="vs-moved-bg" ></div>
        <span id="vs-move-btn" class="vs-move-btn" ></span>
        <div id="vs-unmoved-bg" class="vs-unmoved-bg" ></div>
        <span id="vs-text" class="vs-text" ondrag="return false" >
          ${ unsuccessTip }
        </span>
      </div>
    `
    
    opts.container.innerHTML = tpl
  }
  
  [event](opts) {
    const $wrapper = $('vs-wrapper')
    const $moved = $('vs-moved-bg')
    const $btn = $('vs-move-btn')
    const $unmoved = $('vs-unmoved-gb')
    const $text = $('vs-text')
    const reset = () => {
      this.start = false
      this.end = false
      $moved.style.width = 0 + 'px'  
      $btn.style.left = 0 + 'px'
      this.offsetArr = []
    }

    $btn.onmousedown = (e) => {
      // 标记滑动开始　记录开始X,Y 位置
      this.start = true
      this.end = false
      this.startX = e.pageX
      this.startY = e.pageY
      this.offsetArr = []
    }

    $btn.onmousemove = (e) => {
      if(this.start && !this.end) {
        // 缓存偏移
        let offsetX = e.pageX - this.startX
        let offsetY = e.pageY - this.startY
        this.offsetArr.push(offsetX+','+offsetY)
        // 设置滑块偏移
        $btn.style.left = offsetX + 'px'
        // 设置已经滑动div
        $moved.style.width = offsetX + 'px'
        // 拿到已滑动和总共宽度
        let movedWidth = parseInt(getWidth($moved)) + $moved.offsetLeft
        let totalWidth = parseInt(getWidth($wrapper)) - parseInt(getWidth($btn))

        if(offsetX < 0) {
          $moved.style.width = 0 + 'px'  
          $btn.style.left = 0 + 'px'
        }

        if(movedWidth >= totalWidth) {
          this.start = false
          this.end = true
          $moved.style.width = totalWidth + 'px'  
          $btn.style.left = totalWidth + 'px'
          opts.success && opts.success($wrapper, $text, this.offsetArr)
        }
        
      }
    }

    $btn.onmouseup = () => {
      if(!this.end) {
        reset(opts)
      }
    }

  }

  reset() {
    this[render](this.opts)
    this[event](this.opts)
  }

} 

export { Slider }
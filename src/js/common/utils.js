const getId = (id) => {
  const dom = document.getElementById(id)
  dom && dom.setAttribute('id', `${dom.id}-${Math.floor(Math.random() * 10000)}` )

  return dom
}

const getWidth = (dom) => {
  return window.getComputedStyle(dom).width
}

const hasClass = (dom, cls) => {
  return dom.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

const addClass = (dom, cls) => {
  dom.className.trim()
  if(!hasClass(dom, cls)) dom.className += ` ${cls}`
}

const removeClass = (dom, cls) => {
  const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
  dom.className.replace(reg, ' ')
}



export { getId,getWidth,addClass,removeClass }
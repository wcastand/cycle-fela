import { h as hdom } from '@cycle/dom'

export default function h(children, style = () => ({}), props = {}, selector = 'div') {
  if (arguments.length === 2 && typeof arguments[1] === 'string') {
    selector = style
    style = () => ({})
  }
  if (arguments.length === 3 && typeof arguments[2] === 'string') {
    selector = props
    props = {}
  }
  return hdom(selector, Object.assign({}, props, { component: style }), children)
}

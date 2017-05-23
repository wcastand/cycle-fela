import h from './h'

export default function createComponent(rules, selector = 'div') {
  return function(props, children) {
    const c = arguments.length === 1 ? props : children
    const p = arguments.length === 1
      ? { component: rules }
      : Object.assign({}, props, { component: rules })
    return h(c, rules, p, selector)
  }
}

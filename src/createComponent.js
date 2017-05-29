import { h } from 'snabbdom'
import fela from 'fela'

const { combineRules } = fela

export default function createComponent(rules, selector = 'div') {
  return function(props, children) {
    const c = arguments.length === 1 ? props : children
    const p = arguments.length === 1
      ? { component: rules }
      : Object.assign({}, props, { component: rules })
    if (typeof selector === 'string') {
      return h(selector, p, c)
    }
    const sel = selector(p, c)
    const mergedRules = combineRules(sel.data.component, rules)
    const pp = Object.assign({}, p, { component: mergedRules })
    return h(sel.sel, pp, c)
  }
}

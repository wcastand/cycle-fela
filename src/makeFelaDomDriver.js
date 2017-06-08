import { makeDOMDriver } from '@cycle/dom'
import { h } from 'snabbdom'
import { createRenderer } from 'fela'
import { render } from 'fela-dom'

export function createClassNames(renderer, theme) {
  return vnode => {
    const data = vnode.data || {}
    const props = data.props || {}
    const staticClassNames = props.className || ''
    const children = typeof vnode.children !== 'undefined'
      ? vnode.children.map(createClassNames(renderer, theme))
      : typeof vnode.text !== 'undefined' ? vnode.text : vnode.children

    if (typeof data.component === 'function') {
      const d = theme === null ? data : Object.assign({}, data, { theme })
      const className =
        renderer.renderRule(data.component, d) +
        `${staticClassNames !== '' ? ' ' + staticClassNames : ''}`
      const p = className !== '' ? Object.assign({}, data, { props: { className } }) : data
      return Object.assign({}, vnode, { children, data: p })
    }
    return Object.assign({}, vnode, { children })
  }
}

export default function makeFelaDomDriver(
  selector,
  { renderedOpts = {}, customStyleNode, theme = null } = {},
  staticRules = [],
) {
  const fn = makeDOMDriver(selector)
  const renderer = createRenderer(renderedOpts)
  const mountNode = customStyleNode || document.createElement('style')
  document.head.appendChild(mountNode)
  render(renderer, mountNode)
  staticRules.map(renderer.renderStatic)
  return (vnode$, name) => fn(vnode$.map(createClassNames(renderer, theme)), name)
}

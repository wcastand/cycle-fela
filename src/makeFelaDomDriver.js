import { makeDOMDriver } from '@cycle/dom'
import { h } from 'snabbdom'
import fela from 'fela'
import felaDom from 'fela-dom'

const { createRenderer } = fela
const { render } = felaDom

export function createClassNames(renderer) {
  return vnode => {
    const data = vnode.data || {}
    const props = data.props || {}
    const staticClassNames = props.className || ''
    const children = typeof vnode.children !== 'undefined'
      ? vnode.children.map(createClassNames(renderer))
      : typeof vnode.text !== 'undefined' ? vnode.text : vnode.children

    if (typeof data.component === 'function') {
      const className =
        renderer.renderRule(data.component, data) +
        `${staticClassNames !== '' ? ' ' + staticClassNames : ''}`
      const p = className !== '' ? Object.assign({}, data, { props: { className } }) : data
      return Object.assign({}, vnode, { children, data: p })
    }
    return Object.assign({}, vnode, { children })
  }
}

export default function makeFelaDomDriver(
  selector,
  { renderedOpts = {}, customStyleNode } = {},
  staticRules = [],
) {
  const fn = makeDOMDriver(selector)
  const renderer = createRenderer(renderedOpts)
  const mountNode = customStyleNode || document.createElement('style')
  document.head.appendChild(mountNode)
  render(renderer, mountNode)
  staticRules.map(renderer.renderStatic)
  return (vnode$, name) => fn(vnode$.map(createClassNames(renderer)), name)
}

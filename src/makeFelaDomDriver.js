import { makeDOMDriver, h as hdom } from '@cycle/dom'
import fela from 'fela'
import felaDom from 'fela-dom'

const { createRenderer } = fela
const { render } = felaDom

export default function makeFelaDomDriver(selector, staticRules = () => ({})) {
  const fn = makeDOMDriver(selector)
  const renderer = createRenderer({})
  const mountNode = document.createElement('style')
  document.head.appendChild(mountNode)
  render(renderer, mountNode)

  renderer.renderStatic(staticRules)

  function createClassNames(vnode) {
    const data = vnode.data || {}
    const props = data.props || {}
    const staticClassNames = props.className || ''
    const children = typeof vnode.children !== 'undefined'
      ? vnode.children.map(createClassNames)
      : typeof vnode.text !== 'undefined' ? vnode.text : vnode.children

    if (typeof data.component === 'function') {
      console.log(staticClassNames)
      const className =
        renderer.renderRule(data.component, data) +
        `${staticClassNames !== '' ? ' ' + staticClassNames : ''}`
      const p = className !== '' ? Object.assign({}, data, { props: { className } }) : data
      return hdom(vnode.sel, p, children)
    }
    return hdom(vnode.sel, data, children)
  }
  return (vnode$, name) => fn(vnode$.map(createClassNames), name)
}

import { run } from '@cycle/run'
import { createRenderer } from 'fela'
import { div, span, hr, h } from '@cycle/dom'
import xs from 'xstream'

import { makeFelaDomDriver, createComponent } from './index'

const styleNode = document.createElement('style')
document.head.appendChild(styleNode)

function createBase(selector) {
  const el = document.createElement('div')
  el.id = selector
  document.body.appendChild(el)
  return el
}
function createDriver(selector) {
  return makeFelaDomDriver(createBase(selector), { customStyleNode: styleNode })
}

describe('Cycle app', () => {
  it('should render corectly', done => {
    const RedLabel = createComponent(() => ({ color: 'red' }), 'label')
    const Container = createComponent(({ mobile = true }) => ({
      display: 'flex',
      flex: mobile ? '1' : '2',
    }))
    function main(sources) {
      const vdom$ = xs.of(
        Container({ mobile: false }, [RedLabel('test'), span('Name:'), hr(), span(`Hello`)]),
      )
      return { DOM: vdom$ }
    }

    run(main, { DOM: createDriver('app') })

    setTimeout(() => {
      const style = document.querySelector('style')
      const dom = document.querySelector('#app')

      expect(style).toMatchSnapshot()
      expect(dom).toMatchSnapshot()
      done()
    }, 150)
  })

  it('should have a dom and a style', done => {
    function main(sources) {
      const vdom$ = xs.of(
        div([
          h('div', { component: () => ({ backgroundColor: 'red' }) }, 'test'),
          span('Name:'),
          hr(),
          span(`Hello`),
        ]),
      )
      return { DOM: vdom$ }
    }

    run(main, { DOM: createDriver('app-test') })

    setTimeout(() => {
      const style = document.querySelector('style')
      const dom = document.querySelector('#app-test')

      expect(style).toMatchSnapshot()
      expect(dom).toMatchSnapshot()
      done()
    }, 150)
  })
})

import { run } from '@cycle/run'
import { createRenderer } from 'fela'
import { div, label, input, hr, h1 } from '@cycle/dom'
import xs from 'xstream'

import h from './h'
import makeFelaDomDriver, { createClassNames } from './makeFelaDomDriver'

const styleNode = document.createElement('style')
document.head.appendChild(styleNode)

function createBase() {
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)
  return el
}
function createDriver() {
  return makeFelaDomDriver(createBase(), { customStyleNode: styleNode })
}

describe('makeFelaDomDriver', () => {
  it('should return a function', () => expect(typeof createDriver()).toBe('function'))

  it('should return a stream of the DOM', () => {
    const vdom$ = xs.of(h('test'))

    expect(createDriver()(vdom$)).toMatchSnapshot()
  })
  it('should return a stream of the DOM', () => {
    const vdom$ = xs.of(h([h('test'), h('test span', 'span')]))

    expect(createDriver()(vdom$)).toMatchSnapshot()
  })
  it('should return a stream of the DOM with style', () => {
    const vdom$ = xs.of(h([h('test', () => ({ backgroundColor: 'red' })), h('test span', 'span')]))

    expect(createDriver()(vdom$)).toMatchSnapshot()
  })

  it('should return a stream of the DOM', () => {
    const vdom$ = xs.of(div('test'))

    expect(createDriver()(vdom$)).toMatchSnapshot()
  })
})

describe('document', () => {
  it('should contains a <style>', () => {
    const driver = createDriver()
    const expected = Object.keys(document.querySelectorAll('style')).length

    expect(expected).toBe(1)
  })

  it('document should create a new node <style>', () => {
    const driver = makeFelaDomDriver(createBase())
    const expected = Object.keys(document.querySelectorAll('style')).length

    expect(expected).toBe(2)
  })
})

describe('createClassNames', () => {
  it('should be a function', () => expect(typeof createClassNames).toBe('function'))

  it('should be a function', () => {
    const renderer = createRenderer()

    expect(typeof createClassNames(renderer)).toBe('function')
  })

  it('should return an object', () => {
    const renderer = createRenderer()
    const preClass = createClassNames(renderer)

    expect(typeof preClass(div('test'))).toBe('object')
  })
  it('should return an object with component props', () => {
    const renderer = createRenderer()
    const preClass = createClassNames(renderer)
    const result = preClass(h('test', () => ({ color: 'red' })))

    expect(typeof result.data.component).toBe('function')
    expect(result.data.component()).toEqual({ color: 'red' })
    expect(result.data.props.className).toMatchSnapshot()
  })
})

describe('Cycle app', () => {
  it('should have a dom and a style', done => {
    function main(sources) {
      const vdom$ = xs.of(
        div([
          h('test', () => ({ backgroundColor: 'red' })),
          label('Name:'),
          hr(),
          h1(`Hello ${name}`),
        ]),
      )
      return { DOM: vdom$ }
    }
    const el = document.createElement('div')
    el.id = 'app-test'
    document.body.appendChild(el)

    run(main, { DOM: createDriver() })

    setTimeout(() => {
      const style = document.querySelector('style')
      const dom = document.querySelector('#app-test')

      expect(style).toMatchSnapshot()
      expect(dom).toMatchSnapshot()
      done()
    }, 150)
  })
})

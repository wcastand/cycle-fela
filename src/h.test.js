import h from './h'
/*
 ** children: string || array
 ** style: fn : props => object = (props) => ({})
 ** props: object = {}
 ** selector: string = 'div'
*/

test('h should return an object', () => expect(typeof h()).toBe('object'))
test('h should return a div', () => {
  const vdom = h('test')
  expect(vdom.sel).toBe('div')
  expect(typeof vdom.data.component).toBe('function')
})
test('h should return a span', () => {
  const vdom = h('test', 'span')
  expect(vdom.sel).toBe('span')
  expect(typeof vdom.data.component).toBe('function')
})
test('h should  return a li', () => {
  const vdom = h('test', () => ({}), 'li')
  expect(vdom.sel).toBe('li')
  expect(typeof vdom.data.component).toBe('function')
})
test('h should have the style in data.component', () => {
  const vdom = h('test', () => ({ backgroundColor: 'red' }), {}, 'div')
  expect(vdom.sel).toBe('div')
  expect(typeof vdom.data.component).toBe('function')
  expect(vdom.data.component({})).toEqual({ backgroundColor: 'red' })
})
test('h result should have a string as text', () => {
  const vdom = h('test')
  expect(vdom.text).toBe('test')
})
test('h should have an array as children', () => {
  const vdom = h([h('test'), h('test2')])
  expect(vdom.children.length).toBe(2)
})

import createComponent from './createComponent'

test('createComponent should return a function', () =>
  expect(typeof createComponent(() => ({}))).toBe('function'))

test('createComponent second call should return an object', () => {
  const Div = createComponent(() => ({}))
  const vdom = Div('test')

  expect(typeof vdom).toBe('object')
  expect(vdom).toMatchSnapshot()
})

test('createComponent should have a function in component props', () => {
  const Div = createComponent(() => ({ backgroundColor: 'red' }))
  const vdom = Div('test')

  expect(vdom.sel).toBe('div')
  expect(typeof vdom.data.component).toBe('function')
})
test('createComponent should have a string as text', () => {
  const Div = createComponent(() => ({ backgroundColor: 'red' }))
  const vdom = Div('test')

  expect(vdom.text).toBe('test')
})
test('createComponent should have an array as children', () => {
  const Div = createComponent(() => ({ backgroundColor: 'red' }))
  const vdom = Div([Div('test'), Div('test2')])
  expect(vdom.children.length).toBe(2)
})

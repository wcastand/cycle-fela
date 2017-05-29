import createComponent from './createComponent'

test('createComponent should return a function', () =>
  expect(typeof createComponent(() => ({}))).toBe('function'))

test('createComponent second call should return an object', () => {
  const Div = createComponent(() => ({ color: 'red' }))
  const vdom = Div('test')
  const style = vdom.data.component({})

  expect(typeof vdom).toBe('object')
  expect(style).toEqual({ color: 'red' })

  expect(vdom).toMatchSnapshot()
})
test('createComponent should compose', () => {
  const Div = createComponent(() => ({ backgroundColor: 'red' }))
  const RedBoldDiv = createComponent(() => ({ fontWeight: 'bold' }), Div)
  const vdom = RedBoldDiv('test')
  const style = vdom.data.component({})

  expect(vdom).toMatchSnapshot()
  expect(style).toEqual({ backgroundColor: 'red', fontWeight: 'bold' })
})
test('createComponent should compose and overwrite rule', () => {
  const RedDiv = createComponent(() => ({ backgroundColor: 'red' }))
  const YellowDiv = createComponent(
    () => ({ fontWeight: 'bold', backgroundColor: 'yellow' }),
    RedDiv,
  )
  const vdom = YellowDiv('test')
  const style = vdom.data.component({})

  expect(vdom).toMatchSnapshot()
  expect(style).toEqual({ backgroundColor: 'yellow', fontWeight: 'bold' })
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

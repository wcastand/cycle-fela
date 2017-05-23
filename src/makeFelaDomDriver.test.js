import makeFelaDomDriver from './makeFelaDomDriver'

const el = document.createElement('div')
const driver = makeFelaDomDriver(el)

test('makeFelaDomDriver should return a function', () => {
  expect(typeof driver).toBe('function')
})

test('document should contain a <style>', () => {
  const expected = Object.keys(document.querySelectorAll('style')).length
  expect(expected).toBe(1)
})

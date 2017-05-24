<h1><a href="https://github.com/wcastand/cycle-fela">Cycle-fela</a></h1>
<br />

Unofficial Cycle bindings for Fela.

[![Build Status](https://travis-ci.org/wcastand/cycle-fela.svg?branch=master)](https://travis-ci.org/wcastand/cycle-fela) [![codecov](https://codecov.io/gh/wcastand/cycle-fela/branch/master/graph/badge.svg)](https://codecov.io/gh/wcastand/cycle-fela)

```sh
npm install --save cycle-fela
# or if you're using yarn
yarn add cycle-fela
```

## Usage

### TODO SOON

## Docs

### makeFelaDomDriver

```javascript
   makeFelaDomDriver('#app')

   const root = document.createElement('div')
   root.id = 'app'
   document.head.appendChild(root)
   makeFelaDomDriver(root)

   const nodeStyle = document.createElement('style')
   document.head.appendChild(nodeStyle)
   makeFelaDomDriver('#app-with-style', { customStyleNode: nodeStyle })

   makeFelaDomDriver('#app', { renderedOpts: { plugins: [...webPresets] } })

   // and pass it to your cycle app :
   run(main, { DOM: makeFelaDomDriver('#app') })
```

Create the driver for fela and DOM. Replace the `makeDomDriver` from `@cycle/dom`.
It takes 3 parameters :
- selector : domNode || string -- (same as makeDomDriver)
- options : ?Object -- default: { renderedOpts = {}, customStyleNode }
- staticRules : ?Array -- default: []

##### options take two parameters: 
- `rendererdOpts` are the options pass to fela renderer. Config can be found [here](http://fela.js.org/docs/api/fela/createRenderer.html)
- `customStyleNode` let you specify a custom DOMNodeStyle to the renderer of fela. By default the driver create one without any id or class

##### staticRules take an array of staticRule for fela:

Allow to pass staticRules to fela renderer, each element of the array should be compatible with fela's [renderStatic](http://fela.js.org/docs/api/fela/Renderer.html#renderstaticstyle-reference) function parameters.

### createComponent

```javascript

const RedLabel = createComponent(() => ({color: 'red'}), 'label')
const Container = createComponent(({mobile = true}) => ({display: 'flex', flex: mobile ? '1' : '2'}))
function main(sources) {
  const vdom$ = xs.of(
    Container({ mobile: true }, [
      RedLabel('test'),
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

run(main, { DOM: makeFelaDomDriver('#app') })
```


## License

Copyright © 2017 Castandet William. Licensed under the MIT License, see [LICENSE.md](LICENSE.md) for more information!
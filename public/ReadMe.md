# **type-18**

The `type-18` is a self-defined front-end only project starter which is supported by `React`, `Redux`, `Webpack` and other libraries. The Project starter includes demos for `redux`, `react-redux`, `reselect`, `mobx` and other self-defined classes and components. It has already setup `HMR`, `code-spliting`, `babel-plugin-react-css-modules`. The project also supports tests via `mocha`, `jest` and integration test simulating user activity driven by `selenium` and `chromedriver`


## **Install**

```bash
$ npm install
```

## **Start Web Dev Server**
#### start project in development mode

development with `HMR` enabled default
```bash
$ npm start
```

## **Build Project**
```bash
$ npm run build
```

## **Test**
#### test with mocha
```bash
$ npm run mocha test/mocha.test.js
$ npm run mochas
```
#### test with jest
```bash
$ npm run jest test/mocha.test.js
$ npm run jests
```
#### test with mocha
```bash
$ npm run mocha integrationTest
```
## **Transpile**
the project support transpile ES6 to ES5 via `@babel/core`
```bash
$ npm link
```
Then, after cli generated
use
```bash
transpile SRC.js TARGET.js
```
or use
```bash
transpile SRC.js
```
will generate a `SRC.transpiled.js` to the same path

### **Develop**
the entry file is `app.jsx`. The router and redux store, actions, reducers are defined in `settings`

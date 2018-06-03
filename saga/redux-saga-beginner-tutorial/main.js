import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { helloSaga } from './sagas'

import Counter from './Counter'
import reducer from './reducers'


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(helloSaga)

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)

/*
First we import our Saga from the ./sagas module.

Thenwe create a middleware using the fonction createSagaMiddleware
exported by the redux-saga library.

Before running our helloSaga, we must connect our midddleware to the store
using applyMiddleware.
Then we can use the sagaMiddleware.run(helloSaga) to start our Saga.
*/

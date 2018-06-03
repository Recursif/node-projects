import { delay } from 'redux-saga'
import { put, takeEvery, all, call } from 'redux-saga/effects'


export function* helloSaga() {
  console.log('Hello Sagas!')
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT'})
}
// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}

/* We import delay, a utility function that returns a Promise
that will resolve after a specified number of milliseconds.
We'll use this function to block the Generator.

Sagas are implementd as Generator functions that
yield objects to the redux-saga middleware.
The yielded object are a kind of instruction to be interpreted by
the middleware will suspend the Saga until the Promise completes.
In the above example, the incrementAsync Saga is suspended until the Promise
returned by delay resolves, which will happen after 1 second.

Once the Promise is resolved, the middleware will resume the Saga, executing code until
the next yield, In this example, the nexr statement is another yielded
object : the result of calling put({type: 'INCREMENT'}) , which instructs the
middleware to dispatch an INCREMENT action.

put is one example of what we call an Effect.
Effects are simple Js objects which contain instructions to be fullfilled by the middleware.
When a middleware retrieves an Effect yieldede by a Saga, the Saga is paused until
the Effect is fulfilled.

We use takeEvery, a helper function provided by redux-saga, to listen for dispatched INCREMENT_ASYNC actions and run incrementAsync each time.





/*
source: https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
Generator: functionshttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

*/

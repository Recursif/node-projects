// the * is normal with saga

export function* helloSaga() {
  console.log('Hello Sagas!')
}


/*
In order to run our Saga, we need to:
- create a Saga middleware with a list of Sagas to run
(so far we have only one helloSaga)
- connect the Saga middleware to the Redux store
*/

/*
source: https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
*/

/*
Reducers
A reducer is a function that receives the current state and an action object,
 decides how to update the state if necessary, and returns the 
 new state: (state, action) => newState. You can think of a reducer as an event
  listener which handles events based on the received action (event) type.



Reducers must always follow some specific rules:

They should only calculate the new state value based on the state and action arguments
They are not allowed to modify the existing state. Instead, they must make immutable
 updates, by copying the existing state and making changes to the copied values.
They must be "pure" - they cannot do any asynchronous logic, calculate random values, 
or cause other "side effects"
We'll talk more about the rules of reducers later, including why they're important 
and how to follow them correctly.

The logic inside reducer functions typically follows the same series of steps:

Check to see if the reducer cares about this action
If so, make a copy of the state, update the copy with new values, and return it
Otherwise, return the existing state unchanged

*/

/*
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'counter/increment') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1
    }
  }
  // otherwise return the existing state unchanged
  return state
}
*/

/*
Detailed Explanation: Why Are They Called 'Reducers?'
The Array.reduce() method lets you take an array of values, process each item in the 
array one at a time, and return a single final result. You can think of it as "reducing
 the array down to one value".

Array.reduce() takes a callback function as an argument, which will be called one time 
for each item in the array. It takes two arguments:

previousResult, the value that your callback returned last time
currentItem, the current item in the array
The first time that the callback runs, there isn't a previousResult available, so we need 
to also pass in an initial value that will be used as the first previousResult.

If we wanted to add together an array of numbers to find out what the total is, we could
 write a reduce callback that looks like this:





const numbers = [2, 5, 8]

const addNumbers = (previousResult, currentItem) => {
  console.log({ previousResult, currentItem })
  return previousResult + currentItem
}

const initialValue = 0

const total = numbers.reduce(addNumbers, initialValue)
// {previousResult: 0, currentItem: 2}
// {previousResult: 2, currentItem: 5}
// {previousResult: 7, currentItem: 8}

console.log(total)
// 15
*/

/*
Notice that this addNumbers "reduce callback" function doesn't need to keep 
track of anything itself. It takes the previousResult and currentItem arguments,
 does something with them, and returns a new result value.

A Redux reducer function is exactly the same idea as this "reduce callback" 
function! It takes a "previous result" (the state), and the "current item" 
(the action object), decides a new state value based on those arguments, and 
returns that new state.

If we were to create an array of Redux actions, call reduce(), and pass in 
a reducer function, we'd get a final result the same way:

const actions = [
  { type: 'counter/increment' },
  { type: 'counter/increment' },
  { type: 'counter/increment' }
]

const initialState = { value: 0 }

const finalResult = actions.reduce(counterReducer, initialState)
console.log(finalResult)
// {value: 3}

We can say that Redux reducers reduce a set of actions (over time) into 
a single state. The difference is that with Array.reduce() it happens all at 
once, and with Redux, it happens over the lifetime of your running app.


*/

/*
Store
The current Redux application state lives in an object called the store .

The store is created by passing in a reducer, and has a method called getState 
that returns the current state value:

import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())
// {value: 0}
*/

/*
Dispatch
The Redux store has a method called dispatch. The only way to update the state 
is to call store.dispatch() and pass in an action object. The store will run 
its reducer function and save the new state value inside, and we can call getState() 
to retrieve the updated value:

store.dispatch({ type: 'counter/increment' })

console.log(store.getState())
// {value: 1}

You can think of dispatching actions as "triggering an event" in the application.
 Something happened, and we want the store to know about it. Reducers act like 
 event listeners, and when they hear an action they are interested in, they 
 update the state in response.

We typically call action creators to dispatch the right action:

const increment = () => {
  return {
    type: 'counter/increment'
  }
}

store.dispatch(increment())

console.log(store.getState())
// {value: 2}
*/

/*
Selectors
Selectors are functions that know how to extract specific pieces of information 
from a store state value. As an application grows bigger, this can help avoid 
repeating logic as different parts of the app need to read the same data:

const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
// 2
*/

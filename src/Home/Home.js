import React from 'react';
import { createStore } from 'redux';
import '../myscss.scss'

//***************OBJECT DESTRUCTURING starts************************
const Hospital = {
    name: 'cloudnine',
    location: {
        city: 'bangalore'
    }
}
const { name = 'Anonymous' } = Hospital;
const { city: area } = Hospital.location;
//console.log(`${name} in ${area}`)
//***************OBJECT DESTRUCTURING ends************************

//***************Array DESTRUCTURING starts************************
const address = ['cloudnine', 'bangalore']
const [nameOfHosp, place] = address;
//console.log(`${nameOfHosp} in ${place}`)
//***************Array DESTRUCTURING ends************************

//***************creating redux store**************************

//Reducers
/**
 * 
 * a) reducers are pure functions which means the function returns the value based on input no other objects used
 * to manipute the return results
 * b) never change the state or action
 */

const countReducer = (state = { 'count': 0 }, action) => {
    if (action.type === 'INCREMENT') {
        const num = action.increment ? action.increment : 1
        return {
            'count': state.count + num
        }
    }
    else if (action.type === 'DECREMENT') {
        return {
            'count': state.count - 1
        }
    }

    return state;
}


const store = createStore(countReducer)
/**
 * 
 * see below for more info
 */

/** 
const store = createStore((state = { 'count': 0 }, action) => {
    if (action.type === 'INCREMENT') {
        const num= action.increment?action.increment:1
        return {
            'count': state.count + num
        }
    }
    else if (action.type === 'DECREMENT') {
        return {
            'count': state.count - 1
        }
    }

    return state;
})
**/
store.subscribe(() => {
    //fetch store state
    //console.log(store.getState())
})
const Home = (props) => {

    //action to perform on the store
    store.dispatch({
        type: 'INCREMENT'
    })

    store.dispatch({
        type: 'DECREMENT'
    })

    store.dispatch({
        type: 'INCREMENT',
        increment: 10
    })
    store.dispatch({
        type: 'INCREMENT'
    })
    //**************************************************
    return (
        <>
            <div className="App-header">
                <div className="bg-text">
                    <header>
                        <h1>{props.title}</h1>
                    </header><br />
                    {props.page}
                    
                </div>
            </div>
        </>
    )
}
export default Home;
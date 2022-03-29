'use strict'
const store = require('../store.js')

const signUp = function (data){
    console.log(store) // this is empty at this point
    // it will be full after sign- in 
    return $.ajax({
        method: "POST",
        url:'https://tic-tac-toe-api-development.herokuapp.com/sign-up',
        data //: data
        
    })
}

const signIn = function (data){
    return $.ajax({
        method: "POST",
        url:'https://tic-tac-toe-api-development.herokuapp.com/sign-in',
        data //: data
        
    })
}

const signOut = function (){
    //console.log('loggedout!')
    return $.ajax({
        method: "DELETE",
        url:'https://tic-tac-toe-api-development.herokuapp.com/sign-out',
        headers: {
            Authorization: 'Bearer ' + store.user.token
        }
        
    })

}


//https://tic-tac-toe-api-development.herokuapp.com/sign-up'

module.exports = {
    signUp, //onSignUp :onSignUp
    signIn,
    signOut
    
}
'use strict'
const store = require('../store.js')
const config = require('../config.js')

const signUp = function (data){
    console.log(store) // this is empty at this point
    // it will be full after sign- in 
    return $.ajax({
        method: "POST",
        url: config.apiUrl + '/sign-up',
        data //: data
        
    })
}

const signIn = function (data){
    return $.ajax({
        method: "POST",
        url: config.apiUrl +'/sign-in',
        data //: data
        
    })
}

const signOut = function (){
    //console.log('loggedout!')
    return $.ajax({
        method: "DELETE",
        url: config.apiUrl + '/sign-out',
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
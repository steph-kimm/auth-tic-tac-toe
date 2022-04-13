'use strict'
// this file handles all the events and passes them into the api 
const getFormFields = require('../../lib/get-form-fields.js')
const authApi = require('./api.js')
const authUi = require('./ui.js')

const onSignUp = function(event){
    event.preventDefault()
    console.log("running events")

    const form = event.target 

    const data = getFormFields(form)
    console.log(data)

    //api call 
    authApi.signUp(data)
    .then(()=>{
        authUi.onSignUpSuccess();
    })
    .catch(authUi.onSignUpFailure())
}

const onSignIn = function(event){
    event.preventDefault()
    console.log("running events")

    const form = event.target 

    const data = getFormFields(form)
    console.log(data)

    //api call data in this case is the user info 
    authApi.signIn(data)
    .then((response)=>{
        authUi.onSignInSuccess(response);

        //here need to create the new game 

        //need to send in the user token 
        //const token = response.user.token 
        //console.log(token)
        const emptyBoard= '{}'
        authApi.makeGame(emptyBoard)
        .then( (response)=>{authUi.onCreateGameSuccess(response)})
    })
    .catch(authUi.onSignInFailure())

    

}

const onSignOut = function(){

    //api call 
    authApi.signOut()
    .then(()=>{
        authUi.onSignOutSuccess();
    })
    //.catch(authUi.onSignOutFailure())
}

module.exports = {
    onSignUp, //onSignUp :onSignUp
    onSignIn,
    onSignOut
    
}
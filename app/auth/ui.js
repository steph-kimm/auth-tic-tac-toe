'use strict'

//the file we store info
const store = require('../store.js')

const onSignUpSuccess = function (){
    //console.log(response)
    $('#auth-display').html('<h3>User signed up successfully! Now please log in to start playing!</h3>')
    $('form').trigger('reset')
}

const onSignUpFailure = function (){
    $('#auth-display').html("<h2>User couldn't sign up! Make sure its a new email and the passwords match! </h2>")
}


const onSignInSuccess = function (response){
    console.log(response)
    //save the user info
    console.log("response user: " + response.user)
    store.user= response.user
    //response.user.token 
    $('#auth-display').html('<h3>User signed in successfully! Now You can start playing!</h3>')
    $('form').trigger('reset')
    $('#game').show()
    $('#sign-in-form').hide()
    $('#sign-up-form').hide()
    $('#sign-out-div').show()
    document.querySelector('#status').innerHTML = "" ;

}

const onCreateGameSuccess = function(response){
    console.log("new game successfully added to API")
    console.log("game response: "+ response.game)
    //store the new game created 
    store.game= response.game
    //store.game = response.user
}


const onSignInFailure = function (){
    $('#auth-display').html("<h2>User couldn't sign in! Wrong email or password </h2>")
}

const onSignOutSuccess = function (){
    $('#auth-display').html("<h2>User signed out! Sign in to play again!</h2>")
    $('#game').hide()
    $('#sign-in-form').show()
    $('#sign-up-form').show()
    $('#sign-out-div').hide()
    $('#status').hide()
    //clear the board
    document.querySelectorAll(".box").forEach(element =>{
        element.classList.remove('circle')
        element.classList.remove('ex')
}) 

}

module.exports = {
    onSignUpSuccess,
    onSignUpFailure,
    onSignInSuccess,
    onSignInFailure,
    onSignOutSuccess,
    onCreateGameSuccess
    
}
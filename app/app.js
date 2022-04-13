// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events.js')
const authApi = require('./auth/api.js')


$(() => {
  // attach event listeners 
  console.log("hi")
  $('#sign-up-form').on('submit', // (event)=>{
    // event.preventDefault()
    // console.log("HERE")
    authEvents.onSignUp
  //}
  )

  $('#sign-in-form').on('submit',  authEvents.onSignIn)
  $('#sign-out-button').on('click',  authEvents.onSignOut)

  //hide the game on load up
  $('#game').hide()
  $('#sign-out-div').hide()

  
  
})


// Below is all for game functionality 


//.addEventListener("click", move);

function clickMove(event){
    console.log(event)
    let target = event.target;

    //console.log("id:" + target.id)

    console.log(played(target))
    if(!played(target)){
        move(target)
    }
    
}
$('#sign-in-form').on('submit', ()=>{
    document.querySelectorAll(".box").forEach(element =>{
        element.addEventListener('click' , clickMove)
      }) 
})




// to see if a box was already played 
function played(box){
  let list = (box.classList);
  for(let i = 0 ; i< list.length ; i++){
      if(list[i] == "circle" || list[i] == "ex"){
          return true
      }
  }

  return false
}

//clear the board
document.querySelector('#clear').addEventListener('click', function(event){
  document.querySelectorAll(".box").forEach(element =>{
          element.classList.remove('circle')
          element.classList.remove('ex')
  }) 
  document.querySelector('h3').innerHTML = "Click on a box to start the game! " ;
  document.querySelectorAll(".box").forEach(element =>{
    element.addEventListener('click' , clickMove)// function(event){
  }) 
})




let toggle = true;
function move(box){
  let boxNum = box.id
  console.log("id:" + box.id);
  if(toggle){
      //box.innerHTML =  "O"
      //make game Obj
      let apiGameObject = {
        "game": {
            "cell": {
                "index": boxNum,
                "value": "o"
              },
              "over": true
          
            }
        }
      box.classList.add('circle')
      toggle = false
      changeTurn()
      winner()
      authApi.updateGame(apiGameObject).then(()=>console.log("Patched successfully"))

  }else{
      // box.innerHTML =  "X"
      let apiGameObject = {
        "game": {
            "cell": {
                "index": boxNum,
                "value": "x"
              },
              "over": true
          
            }
        }
      box.classList.add('ex')
      toggle = true
      changeTurn()
      winner()

      authApi.updateGame(apiGameObject).then(()=>console.log("Patched successfully"))
  }
  
}
function changeTurn(){
  if(toggle){
      document.querySelector('#status').innerHTML = "It is O's Turn! " ;
  } else{
      document.querySelector('#status').innerHTML = "It is X's turn!" ;
  }
}

function moveArray(){
  let moves = [ ]
  document.querySelectorAll(".box").forEach(element =>{
      moves.push(element.classList[1])
  }) 
  return moves

}

function stopGame(){
    document.querySelectorAll(".box").forEach(element =>{
        element.removeEventListener('click' , clickMove)
    }) 
}
function winner(){
  let moves = moveArray();
  console.log(moveArray())
  //first row DONE 
  if(moves[0] == "circle"){
      if(moves[1] == "circle" && moves[2] == "circle"){
          document.querySelector('#status').innerHTML = "O is the winner!! Clear the board to play again!" ;
          stopGame()
      }
      else if(moves[3] == "circle" && moves[6] == "circle"){   
          document.querySelector('#status').innerHTML = "O is the winner!! Clear the board to play again!" ;
          stopGame()
      }
      else if(moves[4]== "circle" && moves[8]== "circle"){
          //left to right diag DONE
          document.querySelector('#status').innerHTML = "O is the winner!! Clear the board to play again!" ;
          stopGame()
      }

  }else if(moves[0] == "ex"){
      if(moves[1] == "ex" && moves[2] == "ex"){//first column DONE 
          document.querySelector('#status').innerHTML = "X is the winner!! Clear the board to play again!" ;
          stopGame()
      }        
      else if(moves[3] == "ex" && moves[6] == "ex"){    
          document.querySelector('#status').innerHTML = "X is the winner!! Clear the board to play again!" ;
          stopGame()
      }
      else if(moves[4]== "ex" && moves[8]== "ex"){
          document.querySelector('#status').innerHTML = "X is the winner!! Clear the board to play again!" ;
          stopGame()
      }

  }

  if(moves[2]== "circle"){//third column  DONE 
      if(moves[5] == "circle" && moves[8] == "circle" ){
          document.querySelector('#status').innerHTML = "O is the winner!! Clear the board to play again!" ;
          stopGame()
      }else if(moves[4] == "circle" && moves[6] == "circle"){//right to left diag DONE \
          document.querySelector('#status').innerHTML = "O is the winner!! Clear the board to play again!" ;
          stopGame()
      }
  }else if(moves[2]== "ex"){
      if(moves[5] == "ex" && moves[8] == "ex" ){
          document.querySelector('#status').innerHTML = "X is the winner!! Clear the board to play again!" ;
          stopGame()
      }else if(moves[4] == "ex" && moves[6] == "ex"){//right to left diag DONE 
          document.querySelector('#status').innerHTML = "X is the winner!! Clear the board to play again!" ;
          stopGame()
      }
  }
  if(moves[3]== "circle" && moves[4]== "circle" && moves[5]== "circle"){//second row 
      document.querySelector('#status').innerHTML = "O is the winner!! Clear the board to play again!" ;
      stopGame()
  }else if(moves[3]== "ex" && moves[4]== "ex" && moves[5]== "ex"){//second row DONE
      document.querySelector('#status').innerHTML = "X is the winner!! Clear the board to play again!" ;
      stopGame()
  }

  if(moves[6]== "circle" && moves[7]== "circle" && moves[8]== "circle"){//third row DONE
      document.querySelector('#status').innerHTML = "O is the winner!! Clear the board to play again!" ;
      stopGame()
  }else if(moves[6]== "ex" && moves[7]== "ex" && moves[8]== "ex"){//third row 
      document.querySelector('#status').innerHTML = "X is the winner!! Clear the board to play again!" ;
      stopGame()
  }

  if(moves[1]== "circle" && moves[4]== "circle" && moves[7]== "circle"){//second column
      document.querySelector('#status').innerHTML = "O is the winner!! Clear the board to play again!" ;
      stopGame()
  } else if(moves[1]== "ex" && moves[4]== "ex" && moves[7]== "ex"){//second column
      document.querySelector('#status').innerHTML = "X is the winner!! Clear the board to play again!" ;
      stopGame()
  }

  //if there is a tie
  let counter = 0

  for(let i = 0; i <9 ; i++){
      if(moves[i] == "ex" || moves[i] == "circle"){
          counter++
      }
  }
  if(counter == 9){
    document.querySelector('#status').innerHTML = "It's a Tie!! Clear the board to play again!" ;
  }
}

winner()
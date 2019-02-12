const moves =document.querySelectorAll('.buttonn');
const newGame = document.querySelector("button");
const restartGame = document.querySelector("button");
const winner = document.querySelector("#winner");

var Scoreo =Number(0);
var Scorex =Number(0);
let turn = 1;
function switchplayer(element) {
  if (!element.textContent) {
    if (turn % 2 === 0) {
      element.textContent = "X";
    } else if (turn % 2 === 1) {
      element.textContent = "O";
    }
    turn++;
  }
  
}

let wincond = [
  [
    moves[0],
    moves[1],
    moves[2]
  ],
  [
    moves[3],
    moves[4],
    moves[5]
  ],
  [
    moves[6],
    moves[7],
    moves[8]
  ],
  [
    moves[0],
    moves[4],
    moves[8]
  ],
  [
    moves[2],
    moves[4],
    moves[6]
  ],
  [
    moves[0],
    moves[3],
    moves[6]
  ],
  [
    moves[1],
    moves[4],
    moves[7]
  ],
  [
    moves[2],
    moves[5],
    moves[8]
  ]
];

function checkwinner() {
  let victoryX = wincond.map(wincond =>
    wincond.every(element => element.textContent == "X")
  );
  let victoryO = wincond.map(wincond =>
    wincond.every(element => element.textContent == "O")
  );
  
  if (victoryX.includes(true)) {
    winner.textContent = "X Wins!";
    turn = NaN;
      Scorex=Scorex+10;
      Scoreo = Scoreo-5;
      document.getElementById("scorex").value=Scorex;
      document.getElementById("scoreo").value=Scoreo;
      var Player =player1;
      var score= document.getElementById("scorex").value;
      var dataToSend={
          "Player": Player,
          "score":score
          }
//      $.ajax({
//          url: 'http://localhost:62726/api/scoresheets/'+player1,
//          data: dataToSend,
//          type: 'PUT',
//          dataType:'json',
//          success: function(res) {
//              console.log(res);
//              alert("Score updated");
//        }
//    });
//      var Player =player2;
//      var score= document.getElementById("scoreo").value;
//      var dataToSend={
//          "Player": Player,
//          "score":score
//          }
//      $.ajax({
//          url: 'http://localhost:62726/api/scoresheets/'+player2,
//          data: dataToSend,
//          type: 'PUT',
//          dataType:'json',
//          success: function(res) {
//              console.log(res);
//              alert("Score Updated");
//            }
//          });
  }
  else if (victoryO.includes(true)) {
            winner.textContent = "O Wins!";
            turn= NaN;
            Scoreo=Scoreo+10;
            Scorex= Scorex -5;
            document.getElementById("scorex").value=Scorex;
            document.getElementById("scoreo").value=Scoreo;
        } else if (turn === 10) {
            winner.textContent = "Tie!";
            turn = NaN;
        }
}
function restart() {
  moves.forEach(function(element) {
    element.textContent = "";
  });
  winner.textContent = '';
  turn = 1;
}

moves.forEach(buttonn => buttonn.addEventListener('click', unused => {
  switchplayer(buttonn);
  checkwinner();
}))
newGame.addEventListener("click", restart);
restartGame.addEventListener("click", restart);
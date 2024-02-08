//board
var blockSize = 25;//La taille carré 
var rows = 20;
var cols = 25;
var board;//canva bleu
var contenu; 

//cordooner tete
var serpX = blockSize * 5;//la position(positionner dan la colonne 5)
var serpY = blockSize * 5;

var indiceX = 0;
var indiceY = 0;

var serpBody = [];//pour lorsqu'il mange la taille de son corps augmente 

//nouri
var nouriX;
var nouriY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    contenu = board.getContext("2d"); //used for drawing on the board

    placenouri();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/8); //100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    contenu.fillStyle="blue";
    contenu.fillRect(0, 0, board.width, board.height);

    contenu.fillStyle="green";
    contenu.fillRect(nouriX, nouriY, blockSize, blockSize);

    if (serpX == nouriX && serpY == nouriY) {
        serpBody.push([nouriX, nouriY]);
        placenouri();
    }

    for (let i = serpBody.length-1; i > 0; i--) {
        serpBody[i] = serpBody[i-1];
    }
    if (serpBody.length) {
        serpBody[0] = [serpX, serpY];
    }

    contenu.fillStyle="red";
    serpX += indiceX * blockSize;
    serpY += indiceY * blockSize;
    contenu.fillRect(serpX, serpY, blockSize, blockSize);
    for (let i = 0; i < serpBody.length; i++) {
        contenu.fillRect(serpBody[i][0], serpBody[i][1], blockSize, blockSize);
    }

    //les conditions pour terminer 
    if (serpX < 0 || serpX > cols*blockSize || serpY < 0 || serpY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < serpBody.length; i++) {
        if (serpX == serpBody[i][0] && serpY == serpBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && indiceY != 1) {
        indiceX = 0;
        indiceY = -1;
    }
    else if (e.code == "ArrowDown" && indiceY != -1) {
        indiceX = 0;
        indiceY = 1;
    }
    else if (e.code == "ArrowLeft" && indiceX != 1) {
        indiceX = -1;
        indiceY = 0;
    }
    else if (e.code == "ArrowRight" && indiceX != -1) {
        indiceX = 1;
        indiceY = 0;
    }
}


function placenouri() {
    
    nouriX = Math.floor(Math.random() * cols) * blockSize;
    nouriY = Math.floor(Math.random() * rows) * blockSize;
}
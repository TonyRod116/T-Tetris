// constants
const startingPos = 34
const columns = 10
const rows = 20
const cellCount = columns * rows
const cellElements = []
const startButton = document.getElementById('start-btn')

const shapeChoices = ['L', 'Li', 'S', 'Si', 'M', 'O', 'I', 'T'];

const shapes = {
    L: {
        className: 'blueShape',
        coords: [-(columns*2), -columns, 0, 1]
    },
    Li: {
        className: 'redShape',
        coords: [-(columns*2) + 1, -(columns) + 1, 0, 1]
    },
    S: {
        className: 'greenShape',
        coords: [-(columns*2), -columns, -(columns) + 1, 1]
    },
    Si: {
        className: 'yellowShape',
        coords: [-(columns*2) + 1, -(columns) +1, -columns, 0]
    },
    M: {
        className: 'purpleShape',
        coords: [-(columns*2), -columns, -(columns*2 + 1), 0]
    },
    O: {
        className: 'orangeShape',
        coords: [-(columns*2), -(columns*2) +1, -(columns), -(columns) +1]
    },
    I: {
        className: 'pinkShape',
        coords: [-(columns*2), -columns, 0, columns, columns*2]
    },
    T: {
        className: 'magicShape',
        coords: [-(columns*2), -(columns*2) +1, -(columns*2) +2, -columns +1, 1]
    }
};

const scoreDisplay = document.getElementById("score")
const gameOverDisplay = document.getElementById("gameOver")
const toggleProjectionBtn = document.getElementById("toggleProjection")
const toggleTPiecesBtn = document.getElementById("toggleTPieces")



//variables
let currentShape = 'L';
let currentPos = startingPos;
let interval = null
let score = 0
let highscore = 0


//functions

function drawShape() {
    for (let position of shapes[currentShape].coords) {
        cellElements[position + currentPos].classList.add(shapes[currentShape].className);
    }
}

function clearLastShape() {
    for (let pos of shapes[currentShape].coords) {
        let cell = cellElements[currentPos + pos];
        if (cell) cell.classList.remove(shapes[currentShape].className);
    }
}

function gameOver() {
    clearInterval(interval);
    alert("Game Over");
}

function stoppedShape() {
    for (let pos of shapes[currentShape].coords) {
        cellElements[currentPos + pos].classList.add('occupied');
    }
}

function createMainBoard() {
    const firstScreen = document.getElementById('firstScreen');
    const main = document.createElement('main');
    main.id = 'main-board';
    firstScreen.appendChild(main); 
    const section = document.createElement('section');
    section.id = 'board' 
    main.appendChild(section);
}

function createBoard() {
    const board = document.getElementById("board")
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")
        // cell.innerText = i
        cell.dataset.index = i
        cellElements.push(cell)
        board.appendChild(cell)
    }
}

function createRandomShape() {
    const idx = Math.floor(Math.random() * shapeChoices.length);
    currentShape = shapeChoices[idx];
}

function downCollision() {
    const coords = shapes[currentShape].coords;
    for (let i = 0; i < coords.length; i++) {
        const cellIdx = currentPos + coords[i];
        const cellBelowIdx = cellIdx + columns;
        if (cellBelowIdx >= cellCount || 
            (cellElements[cellBelowIdx] && cellElements[cellBelowIdx].classList.contains('occupied'))) {
            return true;
        }
    }
    return false;
}


function leftCollision() {
    const coords = shapes[currentShape].coords; 
    for (let i = 0; i < coords.length; i++) {
        const cellIdx = currentPos + coords[i];        
        const cellLeftToIdx = cellIdx - 1;        
        if (cellElements[cellLeftToIdx].classList.contains('occupied') && (cellIdx % columns !== 0)) { 
            return true; 
        }
    }
    return false; 
}

function rightCollision() {
    const coords = shapes[currentShape].coords; 
    for (let i = 0; i < coords.length; i++) {
        const cellIdx = currentPos + coords[i];        
        const cellRightToIdx = cellIdx + 1;        
        if (cellElements[cellRightToIdx].classList.contains('occupied') && (cellIdx % columns !== 9)) { 
            return true; 
        }
    }
    return false; 
}


function startPlayDown() {
    if (downCollision()) {
        clearInterval(interval);
        stoppedShape();
        currentPos = startingPos;
        createRandomShape();
        if (downCollision()) {
            drawShape();
            setTimeout(gameOver, 50);
            return;
        }
        drawShape();
        startInterval();
    } else {
        clearLastShape();
        currentPos += columns;
        drawShape();
    }
}

function startInterval() {
        interval = setInterval(startPlayDown, 200)
}



function moveShape(event) {
    const keypressed = event.key
    let canMove = true
    if (keypressed === "ArrowLeft" && leftCollision() === false) {
        for (let i = 0; i < shapes[currentShape].coords.length; i++) {
            const idx = currentPos + shapes[currentShape].coords[i];
            if (idx % columns === 0) {
                canMove = false;
                break;
            }
        }
        if (canMove) {
        clearLastShape();
        currentPos--;
        drawShape();
        }
    }
    if (keypressed === "ArrowRight" && rightCollision() === false ) {
        for (let i = 0; i < shapes[currentShape].coords.length; i++) {
            const idx = currentPos + shapes[currentShape].coords[i];
            if (idx % columns === 9) {
                canMove = false;
                break;
            }
        }
        if (canMove) {
            clearLastShape();
            currentPos++;
            drawShape();
        }
    }
}

function startGameFunction() {
    createMainBoard()
    createBoard()
    createRandomShape()
    drawShape();
    startInterval()
}


startButton.addEventListener("click", startGameFunction) 
document.addEventListener("keyup", moveShape)
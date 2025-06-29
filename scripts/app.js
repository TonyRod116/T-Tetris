// constants
const columns = 10
const rows = 20
const cellCount = columns * rows
const cellElements = []
const startButton = document.getElementById('start-btn')
const InitialPiece = []

const scoreDisplay = document.getElementById("score")
const startBtn = document.getElementById("start")
const gameOverDisplay = document.getElementById("gameOver")
const toggleProjectionBtn = document.getElementById("toggleProjection")
const toggleTPiecesBtn = document.getElementById("toggleTPieces")



//variables
let interval = null
let occupied = []
let board = ''
let socre = 0
let highscore = 0
let randomPiece = 0
let shapeNum = 0
let currentPos = 24;
let currentShapeNum = 0;
let cell = 0

//functions

function drawShape(currentPos,shapeNum) {
    if (shapeNum === 0) {
        Shape0(currentPos)
    }
    if (shapeNum === 1) {
        Shape1(currentPos)
    }
    if (shapeNum === 2) {
        Shape2(currentPos)
    }
    if (shapeNum === 3) {
        Shape3(currentPos)
    }
    if (shapeNum === 4) {
        Shape4(currentPos)
    } 
    if (shapeNum === 5) {
        Shape5(currentPos)
    }
    if (shapeNum === 6) {
        Shape6(currentPos)
    } 
    if (shapeNum === 7) {
        Shape7(currentPos)
    }
}

// Blue "L" Shape:
function Shape0(currentPos) {
    cellElements[currentPos].classList.add("blueShape");
    cellElements[currentPos - 10].classList.add("blueShape");
    cellElements[currentPos - 20].classList.add("blueShape");
    cellElements[currentPos + 1].classList.add("blueShape");
}
// Red "inverted L" Shape:
function Shape1(currentPos) {
    cellElements[currentPos + 1].classList.add("redShape");
    cellElements[currentPos - 9].classList.add("redShape");
    cellElements[currentPos - 19].classList.add("redShape");
    cellElements[currentPos].classList.add("redShape");
}
// Green "S" Shape:
function Shape2(currentPos) {
    cellElements[currentPos + 1].classList.add("greenShape");
    cellElements[currentPos - 9].classList.add("greenShape");
    cellElements[currentPos - 10].classList.add("greenShape");
    cellElements[currentPos - 20].classList.add("greenShape");
}
// Yellow "inverted S" Shape:
function Shape3(currentPos) {
    cellElements[currentPos].classList.add("yellowShape");
    cellElements[currentPos - 10].classList.add("yellowShape");
    cellElements[currentPos - 9].classList.add("yellowShape");
    cellElements[currentPos - 19].classList.add("yellowShape");
}
// Purple "Mountain" Shape:
function Shape4(currentPos) {
    cellElements[currentPos].classList.add("purpleShape");
    cellElements[currentPos - 10].classList.add("purpleShape");
    cellElements[currentPos - 20].classList.add("purpleShape");
    cellElements[currentPos - 9].classList.add("purpleShape");
}
// Orange "O" Shape:
function Shape5(currentPos) {
    cellElements[currentPos - 20].classList.add("orangeShape");
    cellElements[currentPos - 10].classList.add("orangeShape");
    cellElements[currentPos - 9].classList.add("orangeShape");
    cellElements[currentPos - 19].classList.add("orangeShape");
}
// Pink "I" Shape:
function Shape6(currentPos) {
    cellElements[currentPos - 20].classList.add("pinkShape");
    cellElements[currentPos - 10].classList.add("pinkShape");
    cellElements[currentPos + 10].classList.add("pinkShape");
    cellElements[currentPos].classList.add("pinkShape");
    cellElements[currentPos + 20].classList.add("pinkShape");
}
// Magic "T" Shape:
function Shape7(currentPos) {
    cellElements[currentPos].classList.add("magicShape");
    cellElements[currentPos - 10].classList.add("magicShape");
    cellElements[currentPos - 19].classList.add("magicShape");
    cellElements[currentPos - 20].classList.add("magicShape");
    cellElements[currentPos - 21].classList.add("magicShape");
}

function currentShapeCollisionPoints(currentPos,shapeNum) {
    if (shapeNum === 0) {
        return [currentPos + 10, currentPos, currentPos - 10, currentPos + 11]
    }
    if (shapeNum === 1) {
        return [currentPos + 11, currentPos + 1, currentPos -9, currentPos + 10]
    }
    if (shapeNum === 2) {
        return [currentPos + 11, currentPos + 1, currentPos, currentPos -10]
    }
    if (shapeNum === 3) {
        return [currentPos + 10, currentPos, currentPos +1, currentPos - 9]
    }
    if (shapeNum === 4) {
        return [currentPos + 10, currentPos, currentPos - 10, currentPos + 1]
    }
    if (shapeNum === 5) {
        return [currentPos - 10, currentPos, currentPos + 1, currentPos -9]
    }
    if (shapeNum === 6) {
        return [currentPos - 10, currentPos, currentPos + 20, currentPos + 10, currentPos + 30]
    }
    if (shapeNum === 7) {
        return [currentPos + 10, currentPos, currentPos -9, currentPos -10, currentPos -11]
    }
    console.log(currentShapeCollisionPoints)
}

function currentShapeCollisionPointsSideways(currentPos,shapeNum) {
    if (shapeNum === 0) {
        return [currentPos, currentPos - 10, currentPos - 20, currentPos + 1]
    }
    if (shapeNum === 1) {
        return [currentPos + 1, currentPos + -9, currentPos -19, currentPos]
    }
    if (shapeNum === 2) {
        return [currentPos + 1, currentPos - 9, currentPos - 10, currentPos - 20]
    }
    if (shapeNum === 3) {
        return [currentPos, currentPos - 10, currentPos - 9, currentPos - 19]
    }
    if (shapeNum === 4) {
        return [currentPos, currentPos - 10, currentPos - 20, currentPos - 9]
    }
    if (shapeNum === 5) {
        return [currentPos - 20, currentPos -10, currentPos - 9, currentPos - 19]
    }
    if (shapeNum === 6) {
        return [currentPos - 20, currentPos -10, currentPos + 10, currentPos, currentPos + 20]
    }
    if (shapeNum === 7) {
        return [currentPos, currentPos - 10, currentPos - 19, currentPos - 20, currentPos - 21]
    }
}

function gameOver() {
    clearInterval(interval);
    alert("Game Over");
}
function getAllOccupiedIndexes() {
    const occupied = [];
    for (let i = 0; i < cellElements.length; i++) {
        if (cellElements[i].classList.contains("occupied")) {
            occupied.push(i); 
        }
        
    }
    occupied.push (210, 211, 212, 213, 214, 215, 216, 217, 218, 219);
    return occupied;
}

function stoppedShape(currentPos,currentShapeNum) {
    const occupied = currentShapeCollisionPoints(currentPos,currentShapeNum)
    for (let i = 0; i < cellElements.length; i++) {
        if (occupied.includes(i)) {
            cellElements[i].classList.add("occupied")
        }
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
    console.log(cellElements)
    console.log(cellCount)
}

function createRandomShape() {
    const shapeNum = Math.floor(Math.random() * 8);
    currentShapeNum = shapeNum
}

function clearLastShape(currentPos,shapeNum) {
    if (shapeNum === 0) {
        cellElements[currentPos].classList.remove("blueShape")
        cellElements[currentPos -10 ].classList.remove("blueShape")
        cellElements[currentPos -20].classList.remove("blueShape")
        cellElements[currentPos +1].classList.remove("blueShape")
    }
    if (shapeNum === 1) {
        cellElements[currentPos].classList.remove("redShape")
        cellElements[currentPos -9].classList.remove("redShape")
        cellElements[currentPos -19].classList.remove("redShape")
        cellElements[currentPos +1].classList.remove("redShape")
    }
    if (shapeNum === 2) {
        cellElements[currentPos +1].classList.remove("greenShape")
        cellElements[currentPos -9].classList.remove("greenShape")
        cellElements[currentPos -10].classList.remove("greenShape")
        cellElements[currentPos -20].classList.remove("greenShape")
    }
    if (shapeNum === 3) {
        cellElements[currentPos].classList.remove("yellowShape")
        cellElements[currentPos -10].classList.remove("yellowShape")
        cellElements[currentPos -9].classList.remove("yellowShape")
        cellElements[currentPos -19].classList.remove("yellowShape")
    }
    if (shapeNum === 4) {
        cellElements[currentPos].classList.remove("purpleShape")
        cellElements[currentPos -10].classList.remove("purpleShape")
        cellElements[currentPos -20].classList.remove("purpleShape")
        cellElements[currentPos -9].classList.remove("purpleShape")
    }
    if (shapeNum === 5) {
        cellElements[currentPos -20].classList.remove("orangeShape")
        cellElements[currentPos -10].classList.remove("orangeShape")
        cellElements[currentPos -9].classList.remove("orangeShape")
        cellElements[currentPos -19].classList.remove("orangeShape")
    }
    if (shapeNum === 6) {
        cellElements[currentPos -20].classList.remove("pinkShape")
        cellElements[currentPos -10].classList.remove("pinkShape")
        cellElements[currentPos +10].classList.remove("pinkShape")
        cellElements[currentPos].classList.remove("pinkShape")
        cellElements[currentPos +20].classList.remove("pinkShape")
    }
    if (shapeNum === 7) {
        cellElements[currentPos].classList.remove("magicShape")
        cellElements[currentPos -10].classList.remove("magicShape")
        cellElements[currentPos -19].classList.remove("magicShape")
        cellElements[currentPos -20].classList.remove("magicShape")
        cellElements[currentPos -21].classList.remove("magicShape")
    }
}

function collision() {
    const shapeCollisionPoints = currentShapeCollisionPoints(currentPos,currentShapeNum)
    const occupiedIndexes = getAllOccupiedIndexes()
    return shapeCollisionPoints.some(index => occupiedIndexes.includes(index + columns)) //needed help for the +columns constant
}


function startAgain() {
    currentPos = 24
    createRandomShape()
    drawShape(currentPos,currentShapeNum);
    if (collision()) {
        currentPos = 24
        drawShape(currentPos,currentShapeNum);
        stoppedShape(currentPos,currentShapeNum)
        setTimeout(gameOver, 50);
    }
}



function startPlayDown() { 
    if (collision ()) { 
        clearInterval(interval);
        stoppedShape(currentPos,currentShapeNum)
        getAllOccupiedIndexes()
        startAgain()
        startInterval()
    } else {
        clearLastShape(currentPos,currentShapeNum)
        currentPos += 10
        drawShape(currentPos,currentShapeNum)
    }
}

function startInterval() {
        interval = setInterval(startPlayDown, 200)
}

function moveShape(event) {
    const keypressed = event.key
    if (keypressed === "ArrowLeft" && currentPos % columns !== 0) {
        clearLastShape(currentPos,currentShapeNum)  
        currentPos--
        drawShape(currentPos,currentShapeNum)
        }   
    if (keypressed === "ArrowRight" && currentPos % columns !== 9) {
        clearLastShape(currentPos,currentShapeNum)
        currentPos++
        drawShape(currentPos,currentShapeNum)
    }
}
function startGameFunction() {
    createMainBoard()
    createBoard()
    createRandomShape()
    drawShape(currentPos,currentShapeNum);
    startInterval()
}


startButton.addEventListener("click", startGameFunction) 
document.addEventListener("keyup", moveShape)
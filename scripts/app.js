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


const shapeTypes = [
    "blueShape",    
    "redShape",     
    "greenShape",  
    "yellowShape",
    "purpleShape", 
    "orangeShape",  
    "pinkShape",   
    "magicShape"   
]


//variables

let board = ''
let socre = 0
let highscore = 0
let randomPiece = 0
let shapeNum = ''
let currentPos = 24
let currentShape = ''
let cell = ''

//functions

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
    cellElements[currentPos +1].classList.add("greenShape");
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
    cellElements[currentPos +10].classList.add("pinkShape");
    cellElements[currentPos].classList.add("pinkShape");
    cellElements[currentPos + 20].classList.add("pinkShape");
}

// Magic "T" Shape:
function Shape7(currentPos) {
    cellElements[currentPos ].classList.add("magicShape");
    cellElements[currentPos - 10].classList.add("magicShape");
    cellElements[currentPos - 19].classList.add("magicShape");
    cellElements[currentPos - 20].classList.add("magicShape");
    cellElements[currentPos - 21].classList.add("magicShape");
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
        cell.innerText = i
        cell.dataset.index = i
        cell.style.width = `${100 / columns}%`
        cell.style.height = `${100 / rows}%`
        cellElements.push(cell)
        board.appendChild(cell)
    }
}

function createRandomShape() {
    //const cell = cellElements[currentPos]
    //const shapeNum = Math.floor(Math.random() * shapeTypes.length);
    const shapeNum = 7
    //currentShape = shapeTypes[shapeNum]
    //cell.classList.add(shapeTypes[0]);
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


function startGameFunction() {
    createMainBoard()
    createBoard()
    createRandomShape()
    
    //cellElements[15].classList.add("shapeL")
    //const getCachedPiece = board.classList.add('ShapeL')
}

startButton.addEventListener("click", startGameFunction) 
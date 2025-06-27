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
    "brownShape"   
]


//variables

let board = ''
let socre = 0
let highscore = 0
let randomPiece = 0
let shapeNum = ''
let currentPos = 24

//functions

function Shape1() {
    

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
    const cell = cellElements[currentPos]
    const shapeNum = Math.floor(Math.random() * shapeTypes.length);
    cell.classList.add(shapeTypes[shapeNum]);
    console.log(shapeNum)
}


function startGameFunction() {
    createMainBoard()
    createBoard()
    createRandomShape()
    
    //cellElements[15].classList.add("shapeL")
    //const getCachedPiece = board.classList.add('ShapeL')
}

startButton.addEventListener("click", startGameFunction) 
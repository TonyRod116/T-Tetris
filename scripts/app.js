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

/*
const shapeL = 
const shapeLi = 
const shapeS =
const shapeSi =
const shapeI =
const shapeO =
const shapeTt =
const shape TT =
*/

//variables

let board = ''
let socre = 0
let highscore = 0
let randomPiece = 0

//functions

/*<main id="main-board">
                <section id="board">
                </section>
            </main>*/

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




function startGameFunction() {
    createMainBoard()
    createBoard()
    
    //cellElements[15].classList.add("shapeL")
    //const getCachedPiece = board.classList.add('ShapeL')
}

startButton.addEventListener("click", startGameFunction) 
// constants
const startingPos = 24
const columns = 10
const rows = 20
const cellCount = columns * rows
const cellElements = []
const startButton = document.getElementById('start-btn')
const shapeChoices = ['L', 'Li', 'S', 'Si', 'M', 'O', 'I', 'T'];

const shapes = {
    L: {
        className: 'blueShape',
        rotations: [
            [-(columns*2), -columns, 0, 1],
            [-(columns)+1, -(columns)-1, -(columns), -1],      
            [-(columns*2) -1, -(columns*2), -(columns), 0], 
            [-(columns)+1, -(columns)-1, -(columns), -(columns*2)+1],  
        ]
    },
    Li: {
        className: 'redShape',
        rotations: [
            [-(columns*2) +1, -(columns) +1, 0, 1], 
            [-(columns*2) -1, -(columns) -1, -(columns), -(columns) +1,],
            [-(columns*2), -(columns*2) +1, -(columns), 0],
            [-(columns) -1, -(columns), -(columns) +1, 1],
        ]
    },
    S: {
        className: 'greenShape',
        rotations: [
            [-(columns*2), -columns, -(columns)+1, 1],
            [-(columns*2) +1, -(columns*2), -(columns) -1, -(columns)],
            [-(columns*2), -columns, -(columns)+1, 1],
            [-(columns*2) +1, -(columns*2), -(columns) -1, -(columns)],
        ]
    },
    Si: {
        className: 'yellowShape',
        rotations: [
            [-(columns*2) +1, -(columns) +1, -(columns), 0],
            [-(columns) -1, -(columns), 0, 1],
            [-(columns*2) +1, -(columns) +1, -(columns), 0],
            [-(columns) -1, -(columns), 0, 1],
        ]
    },
    M: {
        className: 'purpleShape',
        rotations: [
            [-(columns*2), -columns, -(columns) + 1, 0],
            [-(columns), -(columns)-1, -(columns) + 1, 0],
            [-(columns*2), -(columns)-1, -(columns), 0],
            [-(columns*2), -(columns) -1, -(columns), -(columns) + 1],
        ]
    },
    O: {
        className: 'orangeShape',
        rotations: [
            [-(columns), -columns+1, 0, 1],
            [-(columns), -columns+1, 0, 1],
            [-(columns), -columns+1, 0, 1],
            [-(columns), -columns+1, 0, 1],
        ]
    },
    I: {
        className: 'pinkShape',
        rotations: [
            [-(columns*2), -columns, 0, columns],
            [-1, 0, 1, 2],
            [-(columns*2), -columns, 0, columns],
            [-1, 0, 1, 2],
        ]
    },
    T: {
        className: 'magicShape',
        rotations: [
            [-(columns*2)-1, -1, 0, 1, columns],
            [-(columns*2), -(columns*2) +2, -(columns) -1, -(columns), 0],
            [-(columns*2), -(columns) -1, -(columns), -(columns) +1, columns +1],
            [-(columns*2) +1, -(columns) +1, -(columns) +2,  +1, -1], 
        ]
    }
};


const gameOverDisplay = document.getElementById("gameOver")
const toggleProjectionBtn = document.getElementById("toggleProjection")
const toggleTPiecesBtn = document.getElementById("toggleTPieces")


//variables
let currentShape = 'L';
let nextShape = null
let nextCellElements = [];
let currentPos = startingPos;
let interval = null
let score = 0
let highscore = 0
let currentRotation = 0
let scoreDisplay;
let nextBoardCells = [];

//functions

function drawShape() {
    for (let position of shapes[currentShape].rotations[currentRotation]) {
        cellElements[position + currentPos].classList.add(shapes[currentShape].className);
    }
}

function drawNextShape() { //helped here, much easier with a board with the same number of columns as the main board
    nextBoardCells.forEach(cell => {
        cell.className = 'next-cell';
    });
    const shape = shapes[nextShape];
    const rotation = shape.rotations[0];
    const startingPosNext = 24;
    for (let offset of rotation) {
        let idx = startingPosNext + offset;
        if (idx >= 0 && idx < nextBoardCells.length) {
            nextBoardCells[idx].classList.add(shape.className);
        }
    }
}

function clearLastShape() {
    for (let pos of shapes[currentShape].rotations[currentRotation]) {
        let cell = cellElements[currentPos + pos];
        if (cell) cell.classList.remove(shapes[currentShape].className);
    }
}

function gameOver() {
    clearInterval(interval);
    const cell54 = cellElements[54];
    cell54.innerHTML = `
    <div id="game-over-message">
            <strong>Game Over</strong><br>
            Score: <b>${score}</b>
            <br><br>
            <button id="restart-btn" style="
            cursor:pointer;">
            Restart
            </button>
        </div>
    `;

    cell54.className = '';

    document.getElementById('restart-btn').onclick = function() {
        window.location.reload();
    }
}


function stoppedShape() {
    let highestRow = rows;

    if (currentShape === "T") {
        let tPositions = shapes["T"].rotations[currentRotation].map(offset => currentPos + offset);
        tPositions.forEach(pos => {
            let dropPos = pos;
            while (dropPos + columns < cellCount &&
                !cellElements[dropPos + columns].classList.contains('occupied')) {
                dropPos += columns;
                cellElements[dropPos].classList.add('occupied');
                cellElements[dropPos].classList.add('magicShape');
            }
            cellElements[pos].classList.add('occupied');
            cellElements[pos].classList.add('magicShape');
            const row = Math.floor(dropPos / columns);
            if (row < highestRow) highestRow = row;
        });
    } else {
        // Comportamiento normal para el resto de piezas
        for (let pos of shapes[currentShape].rotations[currentRotation]) {
            const cellIdx = currentPos + pos;
            cellElements[cellIdx].classList.add('occupied');
            const row = Math.floor(cellIdx / columns);
            if (row < highestRow) highestRow = row;
        }
    }
    let sumPoints = 2;
    if (highestRow >= 19) sumPoints = 2;
    else if (highestRow >= 18) sumPoints = 4;
    else if (highestRow >= 17) sumPoints = 6;
    else if (highestRow >= 16) sumPoints = 8;
    else if (highestRow >= 15) sumPoints = 10;
    else if (highestRow >= 14) sumPoints = 12;
    else if (highestRow >= 13) sumPoints = 14;
    else if (highestRow >= 12) sumPoints = 16;
    else if (highestRow >= 11) sumPoints = 18;
    else if (highestRow >= 10) sumPoints = 20;
    else if (highestRow >= 9) sumPoints = 23;
    else if (highestRow >= 8) sumPoints = 27;
    else if (highestRow >= 7) sumPoints = 35;
    else if (highestRow >= 6) sumPoints = 40;
    else if (highestRow >= 5) sumPoints = 45;
    else if (highestRow >= 4) sumPoints = 50;
    else if (highestRow >= 3) sumPoints = 60;
    else if (highestRow >= 2) sumPoints = 70;
    else sumPoints = 75;
    score += sumPoints;
    scoreDisplay.textContent = score;
}



function createMainBoard() {
    audio.volume = 0.7;
    const firstScreen = document.getElementById('firstScreen');
    const main = document.createElement('main');
    main.id = 'main-board';
    firstScreen.appendChild(main); 
    const boardSection = document.createElement('section');
    boardSection.id = 'board';
    main.appendChild(boardSection);
    const scoreboard = document.createElement('div');
    scoreboard.id = 'scoreboard';
    scoreboard.innerHTML = `
        <h2>Score</h2>
        <div id="score">0</div>    
        <h2>Next</h2>
        <div id="next-board"></div>
    `;
    main.appendChild(scoreboard);
    scoreDisplay = document.getElementById("score");
    createNextBoard();
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

function createNextBoard() {
    const nextBoard = document.getElementById('next-board');
    nextBoard.innerHTML = ''; 
    nextBoardCells = [];
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.classList.add('next-cell');
        nextBoard.appendChild(cell);
        nextBoardCells.push(cell);
    }
}

function createRandomShape() {
    if (nextShape === null) {
        nextShape = shapeChoices[Math.floor(Math.random() * shapeChoices.length)];
    }
    currentShape = nextShape;
    currentRotation = 0;
    nextShape = shapeChoices[Math.floor(Math.random() * shapeChoices.length)];
    drawNextShape();
}



function downCollision() {
    const coords = shapes[currentShape].rotations[currentRotation];
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

function canRotate(nextRotation) {
    const nextCoords = shapes[currentShape].rotations[nextRotation];
    const baseCol = currentPos % columns;  
    for (let i = 0; i < nextCoords.length; i++) {
        const idx = currentPos + nextCoords[i];
        if (idx < 0 || idx >= cellCount) return false;
        const col = idx % columns;
        if (col < 0 || col >= columns) return false;
        if (Math.abs(col - baseCol) > 3) return false; 
        if (cellElements[idx].classList.contains('occupied')) return false;
    }
    return true;
}

function leftCollision() {
    const coords = shapes[currentShape].rotations[currentRotation]; 
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
    const coords = shapes[currentShape].rotations[currentRotation]; 
    for (let i = 0; i < coords.length; i++) {
        const cellIdx = currentPos + coords[i];        
        const cellRightToIdx = cellIdx + 1;        
        if (cellElements[cellRightToIdx].classList.contains('occupied') && (cellIdx % columns !== 9)) { 
            return true; 
        }
    }
    return false; 
}

function checkRows() { 
    let rowsToDelete = [];
    for (let i = 0; i < rows; i++) {
        const start = i * columns;
        const end = start + columns;
        const row = cellElements.slice(start, end);
        if (row.every(cell => cell.classList.contains('occupied'))) {
            rowsToDelete.push(i);
        }
    }
    if (rowsToDelete.length > 0) {
        clearInterval(interval);
        score += rowsToDelete.length * 100;
        scoreDisplay.textContent = score;
        rowsToDelete.forEach(rowIdx => {
            const start = rowIdx * columns;
            const end = start + columns;
            cellElements.slice(start, end).forEach(cell => {
                cell.classList.remove('blink');
                void cell.offsetWidth; // helped here
                cell.classList.add('blink');
            });
        });
        setTimeout(() => {
            rowsToDelete.forEach(rowIdx => {
                const start = rowIdx * columns;
                const end = start + columns;
                for (let i = start; i < end; i++) {
                    cellElements[i].className = 'cell';
                }
            });
            for (let i = Math.max(...rowsToDelete) - 1; i >= 0; i--) { // helped here as well
                let rowsBelow = rowsToDelete.filter(rowIdx => rowIdx > i).length;
                if (rowsBelow > 0) {
                    for (let j = 0; j < columns; j++) {
                        const fromIdx = i * columns + j;
                        const toIdx = (i + rowsBelow) * columns + j;
                        cellElements[toIdx].className = cellElements[fromIdx].className;
                        cellElements[fromIdx].className = 'cell';
                    }
                }
            }
            checkRows(); 
        }, 660);
    } else {
        startInterval();
        drawShape();
    }
}



function startPlayDown() {
    clearInterval(interval);
    if (downCollision()) {
        stoppedShape();
        checkRows();
        currentPos = startingPos;
        createRandomShape();
        if (downCollision()) {
            drawShape();
            setTimeout(gameOver, 50);
            clearInterval(interval);
            return;
        }
        drawShape();
    } else {
        clearLastShape();
        currentPos += columns;
        drawShape();
        startInterval();
    }
}

function startInterval() {
        interval = setInterval(startPlayDown, 200)
}

function moveShape(event) {
    const keypressed = event.key
    let canMove = true
    const coords = shapes[currentShape].rotations[currentRotation];
    if (keypressed === "ArrowLeft" && leftCollision() === false) {
        for (let i = 0; i < coords.length; i++) {
            const idx = currentPos + coords[i];
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
        for (let i = 0; i < coords.length; i++) {
            const idx = currentPos + coords[i];
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
    if (keypressed === "ArrowUp" || keypressed === "d" || keypressed === "D") {
        let nextRotation = (currentRotation + 1) % shapes[currentShape].rotations.length;
        if (canRotate(nextRotation)) {
            clearLastShape();
            currentRotation = nextRotation;
            drawShape();
        }
    }

    if (keypressed === "a" || keypressed === "A") {
        let nextRotation = (currentRotation - 1 + shapes[currentShape].rotations.length) % shapes[currentShape].rotations.length;
        if (canRotate(nextRotation)) {
            clearLastShape();
            currentRotation = nextRotation;
            drawShape();
        }
    }
}


const audio = document.getElementById('tetris-audio');
audio.volume = 0.2;


function startGameFunction() {
    document.getElementById('start-btn').style.display = 'none';
    createMainBoard()
    createBoard();
    createRandomShape()
    drawShape();
    startInterval()
}


startButton.addEventListener("click", startGameFunction) 
document.addEventListener("keyup", moveShape)



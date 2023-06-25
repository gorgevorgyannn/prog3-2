multForGrass = 8
socket = io();
var side = 20, m = 40, n = 40;
var grassColor = "#009424"
function setup() {
    frameRate(40)
    createCanvas(n * side, m * side);
    background('#e8e8e8')
    button1 = document.getElementById('summer')
    button2 = document.getElementById('winter')
    button1 = addEventListener("click", onColorChange)
    button2 = addEventListener("click", onColorChange)
}

function onColorChange() {
    if (event.target.id == "summer") {
        grassColor == "#12D804"
        multForGrass = 5
    }
    else if (event.target.id == "winter") {
        grassColor = "white"
        multForGrass = 10
    }
    let data = {
        multForGrass: multForGrass
    }
    socket.on("matrix", drawMatrix);
    socket.emit("afterClick", data)
}

function generator(matLen, gr, grEat, pred, predcr, dp, gecr) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < predcr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < dp; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < gecr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }

    return matrix;

}

grassArr = []
grassEaterArr = []
predatorArr = []
GrassEaterCreatureArr = []
PredatorCreatureArr = []
DeadlyPoleArr = []

function drawMatrix(data) {
    matrix = data.matrix;
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(grassColor)
            } else if (matrix[y][x] == 0) {
                fill('#acacac')
            } else if (matrix[y][x] == 2) {
                fill('yellow')
            } else if (matrix[y][x] == 3) {
                fill('black')
            } else if (matrix[y][x] == 4) {
                fill('white')
            } else if (matrix[y][x] == 5) {
                fill('blue')
            } else if (matrix[y][x] == 6) {
                fill('#48D1CC')
            }
            rect(x * side, y * side, side, side)
        }
} 


        for (let i in grassArr) {
            grassArr[i].mul()
        }
        for (let i in grassEaterArr) {
            grassEaterArr[i].mul()
            grassEaterArr[i].eat()
        }
        for (let i in predatorArr) {
            predatorArr[i].mul()
            predatorArr[i].eat()
        }
        for (let i in PredatorCreatureArr) {
            PredatorCreatureArr[i].move()
            if (predatorArr.length <= 15) {
                PredatorCreatureArr[i].mul()
            }
        }
        for (let i in DeadlyPoleArr) {
            DeadlyPoleArr[i].eat()
        }
        for (let i in GrassEaterCreatureArr) {
            GrassEaterCreatureArr[i].move()
            if (grassEaterArr.length <= 15) {
                GrassEaterCreatureArr[i].mul()
            }
        }
    }

   


socket.on("matrix", drawMatrix);
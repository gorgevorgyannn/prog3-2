function generator(matLen, gr, grEat, pred, predsp, dp, ges) {
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
    for (let i = 0; i < predsp; i++) {
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
    for (let i = 0; i < ges; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }

    return matrix;

}

let side = 20;

let matrix = generator(35, 140, 80, 80, 10, 10, 10);

let grassArr = []
let grassEaterArr = []
let PredatorArr = []
let PredatorSpawnArr = []
let DeadlyPoleArr = []
let GrassEaterSpawnArr = []

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(3)
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let grE = new GrassEater(x, y)
                grassEaterArr.push(grE)
            }
            else if (matrix[y][x] == 3) {
                let pred = new Predator(x, y)
                PredatorArr.push(pred)
            }
            else if (matrix[y][x] == 4) {
                let predsp = new PredatorSpawn(x, y)
                PredatorSpawnArr.push(predsp)
            } else if (matrix[y][x] == 5) {
                let dp = new DeadlyPole(x, y)
                DeadlyPoleArr.push(dp)
            } else if (matrix[y][x] == 5) {
                let dp = new DeadlyPole(x, y)
                DeadlyPoleArr.push(dp)
            }
            else if (matrix[y][x] == 6) {
                let ges = new GrassEaterSpawn(x, y)
                GrassEaterSpawnArr.push(ges)
            }
        }
    }
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('green')
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
    for (let i in PredatorArr) {
        PredatorArr[i].mul()
        PredatorArr[i].eat()
    }
    for (let i in PredatorSpawnArr) {
        PredatorSpawnArr[i].move()
        if (PredatorArr.length <= 15) {
            PredatorSpawnArr[i].mul()
        }
    }
    for (let i in DeadlyPoleArr) {
        DeadlyPoleArr[i].eat()
    }
    for (let i in GrassEaterSpawnArr) {
        GrassEaterSpawnArr[i].move()
        if (grassEaterArr.length <= 15) {
            GrassEaterSpawnArr[i].mul()
        }
    }
}
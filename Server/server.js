var express = require("express");

var fs = require("fs");

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static("../Client"));

app.get("/", function (req, res) {
    res.redirect("index.html");

});

server.listen(3000, function () {
    console.log("App is running on port 3000");

});

grassArr = []
grassEaterArr = []
predatorArr = []
GrassEaterCreatureArr = []
PredatorCreatureArr = []
DeadlyPoleArr = []


Grass = require("./Modules/grass")
GrassEater = require("./Modules/grasseater")
Predator = require("./Modules/predator")
GrassEaterCreature = require("./Modules/grasseatercreature")
PredatorCreature = require("./Modules/predatorcreature")
DeadlyPole = require("./Modules/deadlypole")


io.on("connection", function (socket) {

    setInterval(drawForBackend, 5000)

})
matrix = generator(35, 140, 80, 80, 10, 10, 10);
var isFemale = true

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



for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            let gr = new Grass(x, y)
            grassArr.push(gr)
        } else if (matrix[y][x] == 2) {
            isFemale = !isFemale
            let grEat = new GrassEater(x, y, isFemale)
            grassEaterArr.push(grEat)
        }
        else if (matrix[y][x] == 3) {
            isFemale = !isFemale
            let pred = new Predator(x, y, isFemale)
            predatorArr.push(pred)
        }
        else if (matrix[y][x] == 4) {
            let predsp = new PredatorCreature(x, y)
            PredatorSpawnArr.push(predsp)
        } else if (matrix[y][x] == 5) {
            let dp = new DeadlyPole(x, y)
            DeadlyPoleArr.push(dp)
        }
        else if (matrix[y][x] == 6) {
            let ges = new GrassEaterCreature(x, y)
            GrassEaterSpawnArr.push(ges)
        }
    }
}


function drawForBackend() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul()
    }
    for (var i in predatorArr) {
        predatorArr[i].mul()
    }
    for (var i in GrassEaterCreatureArr) {
        GrassEaterCreatureArr[i].mul()
    }
    for (var i in PredatorCreatureArr) {
        PredatorCreatureArr[i].mul()
    }
    for (var i in DeadlyPoleArr) {
        DeadlyPoleArr[i].mul()
    }

    let sendData = {
        matrix: matrix
    }
    statistics = {
        Grasses: grassArr.length,
        GrassEaters: grassEaterArr.length,
        Predators: predatorArr.length,
        GrassEaterCreatures: grassEaterCreatures.length,
        PredatorCreatures: PredatorCreatureArr.length,
        DeadlyPoles: DeadlyPoleArr.length
    }

    io.sockets.emit("matrix", sendData)
}
setTimeout(drawForBackend , 1000)
var size = 3;
var move = 0;
var minute = 0;
var hour = 0;
var second = 0;
var rounds = 0;
var srtwatch = false;
var won = false;
var pturns = 0;
var currtile;
var blocktile;
var block;




let start = document.getElementById("strt");
start.addEventListener("click", click);

let newround = document.getElementById("new");
newround.addEventListener("click", nwround);

//To start a new game and shuffle after that
function click() {

    srtwatch = true;
    won = false;
    var seq = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var imgOrder = seq.sort(() => Math.random() - 0.5);

    start.innerHTML = "Shuffle";
    deletecurrent();

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            var tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./tiles/" + imgOrder.shift() + ".svg";
            // tile.src = "./tiles/" + seq.shift() + ".svg";
            if (tile.src.includes("9.svg")) {
                block = tile;
            }

            //Drag Functionality
            tile.addEventListener("dragstart", dragstart); //Click an image to drag
            tile.addEventListener("dragover", dragover); //moving image around
            tile.addEventListener("dragenter", dragenter); //dragging image onto other images
            tile.addEventListener("dragleave", dragleave); //dragged image leaving another image
            tile.addEventListener("drop", dragdrop); //drag and image over another image, drop the image
            tile.addEventListener("dragend", dragend); //after drag drop, swap the two tiles

            document.getElementById("game").append(tile);

        }
    }
}

//To start a new round
function nwround() {

    
    rounds = rounds + 1;
    move = 0;
    
    let ct = document.getElementById("turns");
    ct.innerHTML = move;

    records();
    resettimer();
    showrecords();
    click();

}

//Drag and drop functionality

function dragstart() {
    currtile = this; //tile that is being dragged
}
function dragover() {

}
function dragenter() {

}
function dragleave() {
    blocktile = this; //this refers to the img being dropped on
}
function dragdrop() {

}
function dragend() {

    let currcord = currtile.id.split("-");
    let blockcord = blocktile.id.split("-");

    let r1 = currcord[0];
    let c1 = currcord[1];

    let r2 = blockcord[0];
    let c2 = blockcord[1];

    let moverow = r1 == r2 && (c2 - c1 == 1 || c2 - c1 == -1);
    let movecol = c1 == c2 && (r2 - r1 == 1 || r2 - r1 == -1);

    let isAdjacent = moverow || movecol;
    let isBlock = blocktile.src.includes("9.svg");

    if (isAdjacent && isBlock) {
        let currimg = currtile.src;
        let blockimg = blocktile.src;

        currtile.src = blockimg;
        blocktile.src = currimg;

        block = currtile;

        moves();

        if (block.id == "2-2") {
            win();
        }
    }

}

//Shuffling
function deletecurrent() {
    $('#game img').map(function () {
        $(this).remove();
    })
}

//Keyboard logic
document.addEventListener('keydown', function (e) {
    var blockid = block.id.split("-");
    var r = parseInt(blockid[0]);
    var c = parseInt(blockid[1]);

    try {
        switch (e.key) {
            case 'ArrowLeft':
                var swapid = r.toString() + "-" + (c - 1).toString();
                var swaptile = document.getElementById(swapid);
                var swapimg = swaptile.src;
                var blockimg = block.src;

                swaptile.src = blockimg;
                block.src = swapimg;

                block = swaptile;

                moves();

                if (block.id == "2-2") {
                    win();
                }

                break;

            case 'ArrowRight':
                var swapid = r.toString() + "-" + (c + 1).toString();
                var swaptile = document.getElementById(swapid);
                var swapimg = swaptile.src;
                var blockimg = block.src;

                swaptile.src = blockimg;
                block.src = swapimg;

                block = swaptile;

                moves();

                if (block.id == "2-2") {
                    win();
                }

                break;

            case 'ArrowUp':
                var swapid = (r - 1).toString() + "-" + (c).toString();
                var swaptile = document.getElementById(swapid);
                var swapimg = swaptile.src;
                var blockimg = block.src;

                swaptile.src = blockimg;
                block.src = swapimg;

                block = swaptile;

                moves();

                if (block.id == "2-2") {
                    win();
                }

                break;

            case 'ArrowDown':
                var swapid = (r + 1).toString() + "-" + (c).toString();
                var swaptile = document.getElementById(swapid);
                var swapimg = swaptile.src;
                var blockimg = block.src;

                swaptile.src = blockimg;
                block.src = swapimg;

                block = swaptile;
                moves();

                if (block.id == "2-2") {
                    win();
                }

                break;
            default:
                break;
        }
    } catch (e) {
        alert('Cannot Move Any Further Out OF The Box');
    }

})

//Stop Watch
window.setInterval(function timer() {
    if (srtwatch) {
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }
        let hrString = hour;
        let minString = minute;
        let secString = second;

        if (hour < 10) {
            hrString = "0" + hrString;
        }

        if (minute < 10) {
            minString = "0" + minString;
        }

        if (second < 10) {
            secString = "0" + secString;
        }


        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
    }
}, 1000);

//Reset stopwatch
function resettimer() {

    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    minute = 0;
    hour = 0;
    second = 0;

}

//Win Condition
function win() {
    var t = 1;
    var done = true;
    $('#game img').map(function () {
        if (!this.src.includes(t.toString() + ".svg")) {
            done = false;
        }
        t++;
    })
    if (done) {
        srtwatch = false;
        won = true;
        wincall();
    }
}

//Win calls
function wincall(){
    deletecurrent();
    let show = document.getElementById("win");
    show.style.display = "block";
    let cross = document.getElementById("cross");
    let newgm = document.getElementById("new2");
    cross.addEventListener("click",function close(){
        show.style.display = "none";
    })
    newgm.addEventListener("click",function newgame(){
        show.style.display = "none";
        nwround();
    })

}



//Storing data locally
function records() {
    localStorage.setItem("Seconds", second);
    localStorage.setItem("Minutes", minute);
    localStorage.setItem("Hours", hour);
    localStorage.setItem("Previous Turns", pturns);
    localStorage.setItem("Rounds", rounds);

}

//For showing previous records
function showrecords() {
    let sec = localStorage.getItem("Seconds");
    let min = localStorage.getItem("Minutes");
    let hr = localStorage.getItem("Hours");
    let pt = localStorage.getItem("Previous Turns");
    let round = localStorage.getItem("Rounds");

    let prevturn = document.getElementById('prevturn');
    let timer = document.getElementById('timer');
    let plays = document.getElementById('plays');

    prevturn.innerHTML = "Previous Turns: " + pt;
    timer.innerHTML = "Previous Time: " + sec + " : " + min + " : " + hr;
    plays.innerHTML = "Round No :" + round;

}

//Setting Turns
function moves() {
    move = move + 1;
    var ct = document.getElementById("turns");
    ct.innerHTML = move;
    pturns = move;
}


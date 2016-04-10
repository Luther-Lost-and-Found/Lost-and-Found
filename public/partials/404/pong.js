var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 8;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 14;
var brickColumnCount = 14;
var brickWidth = 40;
var brickHeight = 10;
var brickPadding = 8;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

positionsRows = [[1,0,0,4,0,5,6,7,8,0,9,0,0,12],
                 [1,0,0,4,0,5,0,0,8,0,9,0,0,12],
                 [1,0,0,4,0,5,0,0,8,0,9,0,0,12],
                 [1,0,0,4,0,5,0,0,8,0,9,0,0,12],
                 [1,0,0,4,0,5,0,0,8,0,9,0,0,12],
                 [1,0,0,4,0,5,0,0,8,0,9,0,0,12],
                 [1,2,3,4,0,5,0,0,8,0,9,10,11,12],
                 [1,2,3,4,0,5,0,0,8,0,9,10,11,12],
                 [0,0,0,4,0,5,0,0,8,0,0,0,0,12],
                 [0,0,0,4,0,5,0,0,8,0,0,0,0,12],
                 [0,0,0,4,0,5,0,0,8,0,0,0,0,12],
                 [0,0,0,4,0,5,0,0,8,0,0,0,0,12],
                 [0,0,0,4,0,5,0,0,8,0,0,0,0,12],
                 [0,0,0,4,0,5,6,7,8,0,0,0,0,12]]

var bricks = [];
var columnCount = 0;
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        if(positionsRows[c][r] != 0){
          bricks[c][r] = { x: (positionsRows[c][r]-1)*48, y: c*18, status: 1 };
        }
        else{
          bricks[c][r] = { x: 0, y: 0, status: 0 };
        }
    }
}

// var bricks = [[{ x: 0, y: 0, status: 1 },{ x: 144, y: 0, status: 1 },{ x: 192, y: 0, status: 1 },{ x: 240, y: 0, status: 1 },{ x: 188, y: 0, status: 1 },{ x: 336, y: 0, status: 1 }]]

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        document.location.href = "/#/itemlist";
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                document.location.href = "/#/itemlist";
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();
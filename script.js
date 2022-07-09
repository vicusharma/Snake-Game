let inputDir = {x: 0, y:0};
let speed = 4;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{x: 1, y: 20}];
food = {x: 13,  y: 15};


function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 40 || snake[0].x <=0 || snake[0].y >= 40 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){

    if(isCollide(snakeArr)){
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        score = 0;
    }

    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        score += 1;
        scoreBoard.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 39;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    gameContainer.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakeBodyPixel');
        }
        gameContainer.appendChild(snakeElement);

    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    gameContainer.appendChild(foodElement);

}





window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1}
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1; 
            console.log("ArrowUp");
        break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1; 
            console.log("ArrowDown");
        break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0; 
            console.log("ArrowLeft");
        break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0; 
            console.log("ArrowRight");
        break;

        default:
            break;
    }
});
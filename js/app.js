// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 800) {
        this.x = -200;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
    this.startX = 200;
    this.startY = 300;
    this.collisionThreshold = 50;
};
// update the dropdown characters
Player.prototype.setCharacter = function(character) {
    this.sprite = character;
};
// reset Player
Player.prototype.reset = function() {
    this.x = this.startX;
    this.y = this.startY;
};
Player.prototype.update = function() {
    // check collision with enemy
    for (const enemy of allEnemies) {
        if (Math.abs(enemy.x - this.x) <= this.collisionThreshold && Math.abs(enemy.y - this.y) <= this.collisionThreshold) {
            this.x = this.startX;
            this.y = this.startY;
            gameScore.resetMoveUp();
        }
    }
    // star collection
    for (const star of allStars) {
        if (Math.abs(star.x - this.x) <= this.collisionThreshold && Math.abs(star.y - this.y) <= this.collisionThreshold) {
            star.x = 1000;
            star.y = 1000;
        }
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(event) {
    gameScore.startTimer();
    switch (event) {
        case 'up':
            if (!(this.y <= 50)) {
                this.y -= 80;
            }
            gameScore.incrementMoveUp();
            gameScore.incrementMoves();
            break;
        case 'down':
            if (!(this.y >= 350)) {
                this.y += 80;
            }
            gameScore.decrementMoveUp();
            gameScore.incrementMoves();
            break;
        case 'left':
            if (!(this.x <= 50)) {
                this.x -= 100;
            }
            gameScore.incrementMoves();
            break;
        case 'right':
            if (!(this.x >= 400)) {
                this.x += 100;
            }
            gameScore.incrementMoves();
            break;
        default:
    }
    gameScore.updateScore();
    gameScore.checkGameCompletion();
};
var GameScore = function() {
    this.moves = 0;
    this.stars = 3;
    this.moveUpCount = 0;
    this.timer = 0;
    this.formatTime = function(time) {
        let seconds = time % 60;
        let minutes = Math.floor(time / 60);
        return minutes + ':' + String("00" + seconds).slice(-2);
    };
};
// start timer
GameScore.prototype.startTimer = function() {
    if (this.moves === 0) {
        interval = setInterval(function() {
            this.timer += 1;
            let time = document.querySelector('.timer');
            time.innerHTML = this.formatTime(this.timer);
        }.bind(this), 1000);
    }
};
GameScore.prototype.incrementMoves = function() {
    this.moves += 1;
};
GameScore.prototype.decrementMoves = function() {
    this.moves -= 1;
};
GameScore.prototype.incrementStars = function() {
    this.stars += 1;
};
GameScore.prototype.decrementStars = function() {
    this.stars -= 1;
};
GameScore.prototype.incrementMoveUp = function() {
    this.moveUpCount += 1;
};
GameScore.prototype.decrementMoveUp = function() {
    this.moveUpCount -= 1;
};
GameScore.prototype.resetMoveUp = function() {
    this.moveUpCount = 0;
};
// message after game completion
GameScore.prototype.checkGameCompletion = function() {
    if (this.moveUpCount === 4) {
        let finalMoves = document.querySelector('.final-moves');
        let finalStars = document.querySelector('.final-stars');
        let finalTime = document.querySelector('.final-time');
        finalMoves.innerHTML = this.moves;
        finalStars.innerHTML = this.stars;
        finalTime.innerHTML = this.formatTime(this.timer);
        $('#myModal').modal();
    }
};
//update moves and stars
GameScore.prototype.updateScore = function() {
    // update game score
    let move = document.querySelector('.moves');
    move.innerHTML = this.moves;
    // update star rating
    let starImages = document.querySelectorAll('.fa-star');
    if (this.moves > 7 && this.moves <= 10) {
        starImages[2].classList.add('star-disabled');
        this.stars = 2;
    } else if (this.moves > 10 && this.moves <= 14) {
        starImages[1].classList.add('star-disabled');
        this.stars = 1;
    } else if (this.moves > 14) {
        starImages[0].classList.add('star-disabled');
        this.stars = 0;
    }
};
// reset game after completion
GameScore.prototype.reset = function() {
    clearInterval(interval);
    // reset state varibles
    this.moves = 0;
    this.stars = 3;
    this.moveUpCount = 0;
    this.timer = 0;
    // reset timer
    let time = document.querySelector('.timer');
    time.innerHTML = this.formatTime(this.timer);
    // reset star ratings
    let stars = document.querySelectorAll('.fa-star');
    stars.forEach(function(s) {
        s.classList.remove('star-disabled');
    });
    // reset moves
    let moves = document.querySelector('.moves');
    moves.innerHTML = this.moves;
    // reset player
    player.reset();
    allStars[0].setPosition(110, 65);
    allStars[1].setPosition(210, 150);
    allStars[2].setPosition(410, 230);
}
var Star = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/Star.png';
    this.x = x;
    this.y = y;
};
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Star.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
};
// play again functionality on Modal
function playAgain() {
    $('#myModal').modal('hide');
    gameScore.reset();
}
// selection of player
function selectPlayer(name) {
    if (name === 'pink') {
        player.setCharacter('images/char-pink-girl.png');
    } else if (name === 'cat') {
        player.setCharacter('images/char-cat-girl.png');
    } else if (name === 'princess') {
        player.setCharacter('images/char-princess-girl.png');
    } else if (name === 'boy') {
        player.setCharacter('images/char-boy.png');
    } else if (name === 'horn') {
        player.setCharacter('images/char-horn-girl.png');
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place all star objects in an array called allStars
let player = new Player(200, 300);
let allEnemies = []
allEnemies.push(new Enemy(15, 65, 200));
allEnemies.push(new Enemy(130, 65, 350));
allEnemies.push(new Enemy(15, 150, 300));
allEnemies.push(new Enemy(130, 150, 200));
allEnemies.push(new Enemy(15, 232, 400));
allEnemies.push(new Enemy(130, 232, 250));
let allStars = []
allStars.push(new Star(110, 65));
allStars.push(new Star(210, 150));
allStars.push(new Star(410, 230));
let interval = undefined;
let gameScore = new GameScore();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
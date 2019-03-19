// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += 200 * dt;
    if(this.x >= 800){
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
};

Player.prototype.update = function () {
    //console.log('inside update');

    let collisionThreshold = 50;

    // check collison
    for(const enemy of allEnemies){
    	if (Math.abs(enemy.x - this.x) <= collisionThreshold && Math.abs(enemy.y - this.y) <= collisionThreshold){
    		console.log('collisonnnnnnnnnnnnnnn', Math.abs(enemy.x - this.x), Math.abs(enemy.y - this.y));
    		this.x = 200; 
    		this.y = 300;
    	}
    }
};

Player.prototype.render = function () {
    //console.log('inside render');
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (event) {
    console.log(event);
    // if(event === 'up'){
    // 	console.log("up pressed");
    // }
    switch (event) {
    	case 'up':
    	console.log("up key");
    	if(!(this.y <= 50)){
    		this.y -= 80;
    	}
    	
    	break;
    	case 'down':
    	console.log("down key");
    	if(!(this.y >= 350)){
    		this.y += 80;
    	}
    	
    	break;
    	case 'left':
    	console.log("left key");
    	if(!(this.x <= 50)){
    		this.x -= 100;
    	}
    	
    	break;
    	case 'right':
    	console.log("right key");
    	if(!(this.x >= 400)){
    		this.x += 100;
    	}
    	
    	break;
    	default:
    	console.log('key not supported', event);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = []
let player = new Player(200, 300);

allEnemies.push(new Enemy(15,65));
allEnemies.push(new Enemy(130,65));
allEnemies.push(new Enemy(250,65));
allEnemies.push(new Enemy(370,65));
allEnemies.push(new Enemy(15,150));
allEnemies.push(new Enemy(130,150));
allEnemies.push(new Enemy(250,150));
allEnemies.push(new Enemy(370,150));
allEnemies.push(new Enemy(15,232));
allEnemies.push(new Enemy(130,232));
allEnemies.push(new Enemy(250,232));
allEnemies.push(new Enemy(370,232));

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

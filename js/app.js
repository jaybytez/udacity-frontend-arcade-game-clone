// Enemies that run on coordinates
var Enemy = function(x, y) {

    // x axis
    // y axis
    // randomly generated speed
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 150) + 100);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Draw the enemy on the provided coordinates
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter which will 
    // ensure the game runs at the same speed for all computers.
    this.x = this.x + this.speed * dt;

    if (this.x > 505) {
        this.x = -2;
    }
};

// Main player that run on coordinates
var Player = function(x, y) {
    // x axis
    // y axis
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

// Draw the enemy on the provided coordinates
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    let player = this;

    //Check if player has collision with each enemy
    allEnemies.forEach(function(enemy) {
        if (player.x < enemy.x + 80 &&
            player.x + 80 > enemy.x &&
            player.y < enemy.y + 60 &&
            60 + player.y > enemy.y) {
            player.reset();
        }
    });
}

// Handle keyboard input
Player.prototype.handleInput = function(e) {
    this.keyPress = e;
        //Up keyPress
    if (this.keyPress === 'up' && this.y > 0) {
        this.y = this.y - 90;
    }

    //Down keyPress
    if (this.keyPress === 'down' && this.y < 400) {
        this.y = this.y + 90;
    }

    //Left keyPress
    if (this.keyPress === 'left' && this.x > 0) {
        this.x = this.x - 100;
    }

    //Right keyPress
    if (this.keyPress === 'right' && this.x < 400) {
        this.x = this.x + 100;
    }

    //Reset keyPress
    this.keyPress = null;

    //Player reaches top, pause image before reset
    if (this.y < 0) {
        setTimeout(() => {
            this.reset();
        }, 200);
    }  
};

// Reset the player after collision or player reaches top
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(202, 405);
var allEnemies = [];

[50, 140, 230].forEach(function(yAxis) {
    allEnemies.push(new Enemy(0, yAxis));
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
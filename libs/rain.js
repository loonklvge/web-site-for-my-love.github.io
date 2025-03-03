let canvas = document.getElementsByClassName('rain')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

function randomNum(max, min) {
  return Math.random() * (max - min) + min;
}

function RainDrops(x, y, endy, velocity, opacity, direction) { // Added direction

    this.x = x;
    this.y = y;
    this.endy = endy;
    this.velocity = velocity;
    this.opacity = opacity;
    this.direction = direction; // 1 for down, -1 for up

    this.draw = function() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x, this.y - this.endy);
        c.lineWidth = 1;
        c.strokeStyle= "rgba(255, 182, 193, " + this.opacity + ")"; // Pink
        c.stroke();
    }

    this.update = function() {
        if (this.direction === 1) { // Moving Down
            let rainEnd = window.innerHeight + 100;
            if (this.y >= rainEnd) {
                this.y = this.endy - 100;
            } else {
                this.y += this.velocity;
            }
        } else { // Moving Up
            let rainEnd = -100;
            if (this.y <= rainEnd) {
                this.y = window.innerHeight + this.endy;
            } else {
                this.y -= this.velocity;
            }
        }
        this.draw();
    }

}

let rainArray = [];

for (let i = 0; i < 140; i++) {
    let rainXLocation = Math.random() * window.innerWidth;
    let rainYLocation = Math.random() * window.innerHeight - window.innerHeight;
    let randomRainHeight = randomNum(50, 50);
    let randomSpeed = randomNum(20, .2);
    let randomOpacity = Math.random() * .55;
    let direction = Math.random() < 0.5 ? 1 : -1; // Randomly choose direction
    rainArray.push(new RainDrops(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity, direction));
}

function animateRain() {

    requestAnimationFrame(animateRain);
    c.clearRect(0,0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < rainArray.length; i++) {
        rainArray[i].update();
    }

}

animateRain();


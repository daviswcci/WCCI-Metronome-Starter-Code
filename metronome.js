// constants
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const bpmElement = document.getElementById("bpm_text");

const metronomeSound = new Audio("click.wav");

const redDot = new Image(15,15);
redDot.src = "red_dot.png";

const blackDot = new Image(15,15);
blackDot.src = "black_dot.png";

// variables
var bpm = 100;
var isRunning = false;
var interval;

// functions
function startMetronome(){
    if(!isRunning){
        clearInterval(interval);
        isRunning = true;
        bpm = parseFloat(bpmElement.value);
        let timer = 60000 / bpm;
        interval = setInterval(click,timer)
        timeElapsed = 0;
    }
}

function stopMetronome(){
    if(isRunning){
        clearInterval(interval);
        isRunning = false;
        timeElapsed = 0;
    }
}

function click(){
    metronomeSound.pause();
    metronomeSound.currentTime = 0;
    metronomeSound.play(); 
}

function incrementBPM(){
    if(isNaN(bpm) || bpm <= 0){
        bpm = 100;
        bpmElement.value = 100;
    }
    bpm++;
    bpmElement.value = bpm;
    if(isRunning){
        isRunning = false;
        startMetronome();
    }
}

function decrementBPM(){
    if(isNaN(bpm) || bpm <= 1){
        bpm = 101;
        bpmElement.value = 101;
    }
    bpm--;
    bpmElement.value = bpm;
    if(isRunning){
        isRunning = false;
        startMetronome();
    }
}

function changeBPM(){
    bpm = parseFloat(bpmElement.value);
    if(isNaN(bpm) || bpm <= 0){
        bpm = 100;
        bpmElement.value = 100;
    }
    if(isRunning){
        isRunning = false;
        startMetronome();
    }
}



var timeElapsed = 0;
var now = Date.now();
var then = Date.now();
var delta = (then - now) / 1000;

function init(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
init();

function animate(){
    requestAnimationFrame(animate);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.clearRect(0,0,canvas.width,canvas.height);
    update();
    draw();
}
animate();

function update(){
    now = Date.now();
    delta = (now - then) / 1000;
    then = Date.now();
    timeElapsed += delta;
}

function draw(){
    if(isRunning){
        let bps = bpm / 60;
        let magnitude = Math.min(canvas.width, canvas.height) * 0.25;
        let t = (Math.PI * timeElapsed * bps) + (Math.PI / 2);
        let x = (canvas.width * 0.5) + (magnitude * Math.cos(t));
        let y = (canvas.height * 0.5) + (magnitude * -1 * Math.abs(Math.sin(t)));
        context.drawImage(redDot, x - 7.5, y - 7.5, 15,15);
        context.drawImage(blackDot, (canvas.width * 0.5) - 7.5, (canvas.height * 0.5) - 7.5 - magnitude, 15,15);
        context.drawImage(blackDot, (canvas.width * 0.5) - 7.5, (canvas.height * 0.5) - 7.5, 15,15);
        context.beginPath();
        context.moveTo((canvas.width * 0.5), (canvas.height * 0.5));
        context.lineTo(x,y);
        context.stroke();
        context.closePath();
    }
}
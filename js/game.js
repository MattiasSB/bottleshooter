/*--------------------------Selectors---------------------------*/ 
//game related
const background = document.querySelector(".background");
const scope = document.querySelector(".scope");
const body = document.querySelector("body");
const allBottles = document.querySelectorAll(".bottleStyles");
//score keeping and timer
const onScreenScore = document.querySelector("#screenScore");
const onScreenTime = document.querySelector(".timer");
//bird
const bird = document.querySelector("#birdContainer");
let isGameDone = false;

//Array of bottles
var bottleIdStorage = [
    document.querySelector("#b1"),
    document.querySelector("#b2"),
    document.querySelector("#b3"),
    document.querySelector("#b4"),
    document.querySelector("#b5"),
];

/*--------------------------Counters---------------------------*/ 
//used to detect whether a user has scoped or not
var adsDetect = false;
var bottleInitialization = true;
//current game score variable
let gameScore = 0;
// flips the bird
let birdFlipper = 0;
//shows the total amount of time
let currentTime = 59;
//counts down the time
let currentCounterTime = 0;
//Detects the if the menu is open or close
let firstBottleShot = false;



/*--------------------------Scope---------------------------*/ 
//Targets the invisible scope and makes it visible while key is down
//Checks for any key press
document.addEventListener("keydown", e =>{
    //only activates scope if its shift
    if (e.shiftKey && isGameDone == false){
        scope.style.visibility = 'visible';
        body.style.cursor = 'none';
        //disabled cursor on body allows the scoped image to be clicked through
        adsDetect = true;
    }
});
//checks for any key to be lifted
document.addEventListener("keyup", () => {
    if (adsDetect == true){
        scope.style.visibility = 'hidden';
        body.style.cursor = 'initial';
        //resets cursor behavior upon release
        adsDetect = false;
    }
});

document.addEventListener('mousemove', e => {
    const coords = document.body.getBoundingClientRect();
    //gets bounding box of container
    let xPos = e.clientX - coords.left - scope.clientWidth/2;
    let yPos = e.clientY - coords.top - scope.clientHeight /2;
    //Gets coordinates and subtracts half of the images width/height to center it on the cursor
    scope.style.left = xPos + "px";
    scope.style.top = yPos + "px";
    //Constantly centers the absolutely positioned scope to the position of the cursor
});

/*--------------------------For Each Method For Bottle Respawn---------------------------*/ 
//loads first bottle
window.onload = bottleInit();

//first bottle load function
function bottleInit () {
    //picks a random bottle from the array
    let visBottle = bottleIdStorage[Math.floor(Math.random()*bottleIdStorage.length)];
    //makes random bottle visible
    visBottle.style.visibility = "visible";
};
//Subtracts if shot doesn't hit bottle
document.addEventListener("click", ()=>{
    //checks to see if game is done or if aiming down sites
    if(isMenuOpen == true && adsDetect == true && isGameDone == false && firstBottleShot == true){
        gameScore--
    }
})

bottleIdStorage.forEach(item => {
    //allows all items to be clicked
    item.addEventListener("click", () =>{
        firstBottleShot= true;
        //starts the timer as soon as bottle is shot
        if(adsDetect == true && item.classList.contains("bottleClicked") == 0 && bottleIdStorage.length > 1 && bottleInitialization == true){
            //starts timer and stores function
                var timingInterval = setInterval(function timerCount(){
                //changes screen time and subtracts the reverse counter
                onScreenTime.innerHTML = currentTime - currentCounterTime;
                //iterate reverse counter
                currentCounterTime++;
                //checks for the timer to hit 0
                if(currentCounterTime == 60){
                    window.clearInterval(timingInterval);
                    //stops the timer
                    gameOverMenu.classList.remove("vis-hidden");
                    isGameDone = true;
                };
            }, 1000);
            bottleInitialization = false;
        }
        if (adsDetect == true && item.classList.contains("bottleClicked") == 0 && bottleIdStorage.length > 1){
            gameScore+=2;
            //checks for scope
            item.classList.add("bottleClicked");
            //adds bottleClicked class
            bottleIdStorage.splice(bottleIdStorage.indexOf(item), 1);
            //splices bottle from array to avoid second spawn
            bottleIdStorage[Math.floor(Math.random()*bottleIdStorage.length)].style.visibility = "visible";
            //makes random bottle visible again
            //Game score advances
        }
        else if (adsDetect == true && bottleIdStorage.length == 1 && item.classList.contains("bottleClicked") == 0) {
            item.classList.add("bottleClicked");
            gameScore+=2;
            //splices the currently selected item
            bottleIdStorage.splice(bottleIdStorage.indexOf(item), 1);
            //loops through all the bottles again to hide and swap all graphics to default
            allBottles.forEach(item =>{
                item.classList.remove("bottleClicked");
                item.style.visibility = "hidden";
            })
            //restores array and its children
            bottleIdStorage.push(
                document.querySelector("#b1"),
                document.querySelector("#b2"),
                document.querySelector("#b3"),
                document.querySelector("#b4"),
                document.querySelector("#b5")
            );
            
            //Spawns a new bottle
            bottleIdStorage[Math.floor(Math.random()*bottleIdStorage.length)].style.visibility = "visible";
        }
    });
});

//Separate event listener for once clicked

document.addEventListener("click", currentScore);

function currentScore(){
    onScreenScore.innerHTML = gameScore;
    endScreenScore.innerHTML = gameScore;
};

//----------------------Bird Flipper --------------------

//starts timer as soon as page loads
window.onload = setInterval(function(){
    if(birdFlipper == 0){
        bird.style.transform = "scaleX(-1)";
        birdFlipper = 1;
    }
    else{
        bird.style.transform = "scaleX(1)";
        birdFlipper = 0;
    }
}, 17000);


//for all the evil people
bird.addEventListener("click", ()=>{
    if (adsDetect == true && firstBottleShot == true) {
	    gameScore -= 1000;
        bird.style.visibility = "hidden";
	    window.open("https://en.wikipedia.org/wiki/Ethics");      
    }
});
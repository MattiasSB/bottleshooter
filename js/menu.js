//menu buttons
const closeButton = document.querySelector("#menuExitButton");
const backArrow = document.querySelector(".backArrow");

const menu = document.querySelector(".menu");
const optionStart = document.querySelector("#start");
const subMenu = document.querySelector(".submenu");
const optionControls = document.querySelector("#controls");
const optionStartOver = document.querySelector(".startOver")
const title = document.querySelector("h2");
//end game menu
const gameOverMenu = document.querySelector(".menuGameOver");
const endScreenScore = document.querySelector("#endScreenScore");
const gameOverRestart = document.querySelector(".gameOverRestart");

let isMenuOpen = true;

const arrowMenuPseudo = {
    playGame: false,
    restart: false,
    controls: false
};


window.onload = close();

/*--------------------------Menu---------------------------*/

optionStartOver .addEventListener("click", ()=>{
    location.reload();
} )
//start menu function/button
optionStart.addEventListener("click", close);
//close menu function/button
closeButton.addEventListener("click", close);

//close button function
function close(){
    menu.style.visibility = "hidden";
    closeSubMenu();
};

//Pause Enabler
document.addEventListener("keydown", e =>{
    //only activates menu if its escape
    if (e.key == "Escape"){
        e.preventDefault();
        //stops escape from closing window
        if(isMenuOpen == false){
            menu.style.visibility = "hidden";
            isMenuOpen = true;
            //true value allows user to make menu visible
            backArrow.style.visibility = "hidden";
            optionStartOver .classList.remove("selected");
            optionStart.classList.remove("controlSelected");
            optionControls.classList.remove("controlSelected");
            closeSubMenu()
        }
        else if (isMenuOpen == true){
            menu.style.visibility = "visible";
            isMenuOpen = false;
            //false value allows user to close menu
        }
    }
});

optionControls.addEventListener("click", openSubMenu);
backArrow.addEventListener("click", closeSubMenu);

backArrow.style.visibility = "hidden";

function openSubMenu(){
    //closes the start button
    optionStart.classList.add("submenu");
    //gets rid of the title
    title.classList.add("submenu");
    //removes animation off title
    optionControls.classList.remove("menuOption");
    //adds title styling
    optionControls.classList.add("title");
    //removes makes 
    subMenu.classList.remove("submenu");
    //start over button appears
    optionStartOver .classList.add("submenu");
    backArrow.style.visibility = "visible";
};

function closeSubMenu(){
    //brings back the start button
    optionStart.classList.remove("submenu");
    //gets rid of the title
    title.classList.remove("submenu");
    //adds animation to controls
    optionControls.classList.add("menuOption");
    //removes controls title styling
    optionControls.classList.remove("title");
    //hides the submenu
    subMenu.classList.add("submenu");
    //brings back start button
    optionStartOver .classList.remove("submenu");
    backArrow.style.visibility = "hidden";
};


//Arrow key navigation initializer

document.addEventListener("keydown", e =>{
    if(e.key == "ArrowDown"){
        if(arrowMenuPseudo.playGame == false && arrowMenuPseudo.restart == false && arrowMenuPseudo.controls == false){
            //checks to see if nothing is selected
            arrowMenuPseudo.playGame = true;
        }
        else if(arrowMenuPseudo.playGame == true){
            //checks for playGame selected
            arrowMenuPseudo.playGame = false;
            arrowMenuPseudo.restart = true;
        }
        else if(arrowMenuPseudo.restart == true){
            //checks for restart game selected
            arrowMenuPseudo.restart = false;
            arrowMenuPseudo.controls = true;
        }
        else if(arrowMenuPseudo.controls == true){
            //checks for control menu
            arrowMenuPseudo.playGame = true;
            arrowMenuPseudo.controls = false;
        }
    }
    else if (e.key == "ArrowUp"){
        //checks to see if none are selected
        if(arrowMenuPseudo.playGame == false && arrowMenuPseudo.restart == false && arrowMenuPseudo.controls == false){
            arrowMenuPseudo.playGame = true;
        }
        else if(arrowMenuPseudo.playGame == true){
            arrowMenuPseudo.playGame = false;
            arrowMenuPseudo.controls = true;
        }
        else if(arrowMenuPseudo.restart == true){
            arrowMenuPseudo.restart = false;
            arrowMenuPseudo.playGame = true;
        }
        else if(arrowMenuPseudo.controls == true){
            arrowMenuPseudo.restart = true;
            arrowMenuPseudo.controls = false;
        }
    }
});


//Arrow Key navigation action

document.addEventListener("keydown", e =>{
    if(e.key == "ArrowDown"){
        if(arrowMenuPseudo.playGame == true){
            optionStart.classList.add("selected");
            optionControls.classList.remove("controlSelected");
        }
        else if(arrowMenuPseudo.restart == true){
            optionStart.classList.remove("selected");
            optionStartOver .classList.add("controlSelected");
        }
        else if(arrowMenuPseudo.controls == true){
            optionControls.classList.add("controlSelected");
            optionStartOver .classList.remove("controlSelected");
        }
    }
    else if (e.key == "ArrowUp"){
        if(arrowMenuPseudo.playGame == true){
            optionStart.classList.add("selected");
            optionStartOver .classList.remove("controlSelected");
        }
        else if(arrowMenuPseudo.restart == true){
            optionControls.classList.remove("controlSelected");
            optionStartOver .classList.add("controlSelected");
        }
        else if(arrowMenuPseudo.controls == true){
            optionControls.classList.add("controlSelected");
            optionStart.classList.remove("selected");
        }
    }
});

document.addEventListener("keydown", e =>{
    if(e.key == "Enter"){
        if(arrowMenuPseudo.playGame == true){
            menu.style.visibility = "hidden";
        }
        else if(arrowMenuPseudo.restart == true){
            location.reload();
        }
        else if(arrowMenuPseudo.controls == true){
            openSubMenu();
        }
    }
});

gameOverRestart.addEventListener("click",() =>{
    location.reload();
});





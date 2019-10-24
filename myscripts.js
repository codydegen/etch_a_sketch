//const container = document.querySelector('#container');
//const grid = document.createElement('div');

// populate grid to begin with, with 16x16 square
populateGrid(16);

// add event listener for each of the different methods of filling in boxes
const colorbtn = document.querySelectorAll(".color");
colorbtn.forEach((button) => button.addEventListener('click', changeFillMethod));

// add event listener for reset grid button
const clearbtn = document.querySelector('#clear');
clearbtn.addEventListener('click', resetGrid);

// At event listener for smooth button
const smooth = document.querySelector('#smooth');
smooth.addEventListener('click', smoothToggle);

// At event listener for propagate button
const propagate = document.querySelector('#propagate');
propagate.addEventListener('click', propagateToggle);

//create grid with size of input
function populateGrid(gridSize){
    const container = document.querySelector('#container');
    container.setAttribute('style','grid-template: repeat('+gridSize+',1fr) / repeat('+gridSize+',1fr);')
    for (let i = 1; i <=gridSize; i++){
        for (let j = 1; j <= gridSize; j++){

            // Create temporary element with box class and class of x-y Location.  Set background color to white.
            let tempElement = document.createElement('div');
            tempElement.classList.add('box');
            tempElement.classList.add('x'+j+'y'+i);
            if (smoothCheck()) {
                 tempElement.classList.add('smooth');
                 console.log(' smooth ');
            }else{
                 tempElement.classList.remove('smooth');
                 console.log(' not smooth ')
             }
             if (propagateCheck()) {
                tempElement.classList.add('propagate');
                tempElement.addEventListener('transitionend', propagatePattern);
                console.log(' propagate ');
           }else{
                tempElement.classList.remove('propagate');
                console.log(' not propagate ')
            }
            tempElement.setAttribute('style','background-color: rgb(255,255,255);');
            container.appendChild(tempElement);
        }
    }
    // Add event listener for each box that is a part of the grid
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((square) => square.addEventListener('mouseenter', mouseOver));
}

//remove all elements from grid so it can be resized, ask for new number of elements
function resetGrid(){
    const container = document.querySelector('#container');  
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const newSize = prompt("How many squares would you like per side?");
    if (!isNaN(newSize)) {
        populateGrid(newSize);

    }else if (newSize !== null){
        alert("Please enter a number.");
        resetGrid();
    }
    
}

//Change the fill method.  Fill method is determined by which button has the "selected" class attribute
function changeFillMethod(e){
    const colorbtn = document.querySelectorAll(".color");
    colorbtn.forEach((button) => button.classList.remove('selected'));
    this.classList.add('selected');
    
}

// Add smooth toggle
function smoothToggle(e){
    const boxes = document.querySelectorAll(".box");
    const smooth = document.querySelector("#smooth");
    smooth.classList.toggle('off');
    smooth.classList.toggle('on');
    boxes.forEach((box) => box.classList.toggle('smooth'));
}

function smoothCheck(){
     return document.querySelector("#smooth").classList.contains('on');
 }
 function propagateToggle(e){
    const boxes = document.querySelectorAll(".box");
    const propagate = document.querySelector("#propagate");
    propagate.classList.toggle('off');
    propagate.classList.toggle('on');
    boxes.forEach((box) => box.classList.toggle('propagate'));
    if(propagateCheck()){
        boxes.forEach((box) => box.addEventListener('transitionend', propagatePattern));
    }
}

function propagateCheck(){
    return document.querySelector("#propagate").classList.contains('on');
 }
 function propagatePattern(e){
    const fillMethod = document.querySelector(".selected").innerText;
    const fillTarget = document.querySelector("."+e.target.classList[1]);
    const thisY = parseInt(fillTarget.classList[1].split('y')[1]);
    const thisX = parseInt(fillTarget.classList[1].split('y')[0].split('x')[1]);
    const container = document.querySelector('#container');
    let maxSize = Math.sqrt(container.childElementCount);
    //console.log(ms);
    //console.log(thisX, thisY);
    for (let i = -1; i<=1; i++){
        for (let j = -1; j<=1; j++){
            //stuff
            let tempX=thisX+i
            let tempY=thisY+j
            if ((i === 0 && j !== 0) || (i !== 0 && j === 0)){
            if (tempX >=1 && tempX <= maxSize && tempY >= 1 && tempY <= maxSize){
                //console.log(tempX);
                //console.log(".x"+tempX+"y"+tempY);
                let propElement = document.querySelector(".x"+tempX+"y"+tempY);
                mouseOverDiv(propElement);
            }
        }
        }
    }

}


//Fill in boxes based on selected method
function mouseOver(e) {
    const fillMethod = document.querySelector(".selected").innerText;
    const fillTarget = document.querySelector("."+e.target.classList[1]);

    if (fillMethod === 'Black'){
        e.target.style.cssText = "background-color: rgb(0,0,0)";
    }else if (fillMethod === 'Random'){
        e.target.style.cssText = "background-color: hsl("+Math.random()*360+","+Math.random()*100+"%,"+Math.random()*100+"%)";
    }else if (fillMethod === 'Light Gradient'){
        changeGradient(fillTarget, 25);
    }else if (fillMethod === 'Dark Gradient'){
        changeGradient(fillTarget, -25);
    }

};

function mouseOverDiv(loc) {
    const fillMethod = document.querySelector(".selected").innerText;
    const fillTarget = document.querySelector("."+loc.classList[1]);

    if (fillMethod === 'Black'){
        loc.style.cssText = "background-color: rgb(0,0,0)";
    }else if (fillMethod === 'Random'){
        loc.style.cssText = "background-color: hsl("+Math.random()*360+","+Math.random()*100+"%,"+Math.random()*100+"%)";
    }else if (fillMethod === 'Light Gradient'){
        changeGradient(fillTarget, 25);
    }else if (fillMethod === 'Dark Gradient'){
        changeGradient(fillTarget, -25);
    }

};

// For fill method for gradients, function was written to abstract the process
function changeGradient(fillTarget, changeAmount){ 
    let colors = fillTarget.getAttribute('style','background-color').split(',');
            let red = Math.round(parseFloat(colors[0].split('(')[colors[0].split('(').length-1])+changeAmount);
            let green = Math.round(parseFloat(colors[1])+changeAmount);
            let blue = Math.round(parseFloat(colors[2].split(')')[0])+changeAmount);
            red = checkColorLimits(red);
            green = checkColorLimits(green);
            blue = checkColorLimits(blue);
            fillTarget.setAttribute('style','background-color: rgb('+red+','+green+','+blue+');')
}

function checkColorLimits(color){
    if (color > 255){
        return 255;
    }else if (color < 0){
        return 0;
    }else {
        return color;
    }
}
const container = document.querySelector('#container');

const grid = document.createElement('div');
//let gridSize = getComputedStyle(container)//.grid-template-columns
let fillMethod = "black";

populateGrid(16);
const clearbtn = document.querySelector('#clear');
clearbtn.addEventListener('click', resetGrid);
const colorbtn = document.querySelectorAll(".color");
colorbtn.forEach((button) => button.addEventListener('click', changeFillMethod));


function changeFillMethod(e){
    const colorbtn = document.querySelectorAll(".color");
    colorbtn.forEach((button) => button.classList.remove('selected'));
    this.classList.add('selected');
    
    console.log(e.target.firstChild.data);
    return e.target.firstChild.data;
}

function resetGrid(){//remove all elements from grid so it can be resized, ask for new number of elements
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

function populateGrid(gridSize){//create grid with size of input
    const container = document.querySelector('#container');
    container.setAttribute('style','grid-template: repeat('+gridSize+',1fr) / repeat('+gridSize+',1fr); background-color: rgb(255,255,255);');
    for (let i = 1; i <=gridSize; i++){
        for (let j = 1; j <= gridSize; j++){
            //console.log(i);
            let tempElement = document.createElement('div');
            //grid.createElement('div');
            tempElement.classList.add('box');
            tempElement.classList.add('x'+i+'y'+j);
            tempElement.setAttribute('style','background-color: rgb(255,255,255);');
            //tempElement.textContent = 'x'+i+'y'+j+'\n'+tempElement.getAttribute('style','background-color');
            console.log(tempElement);
            container.appendChild(tempElement);
        }
    }
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((square) => square.addEventListener('mouseenter', mouseOver));
}
function mouseOver(e) {
    const fillMethod = document.querySelector(".selected").innerText;
    //console.log(e.target.classList[1]);
    const fillTarget = document.querySelector("."+e.target.classList[1]);
    //console.log(fillTarget);
    //console.log(fillTarget.getAttribute('style','background-color'));
    if (fillMethod === 'Black'){
        e.target.style.cssText = "background-color: rgb(0,0,0)";
    }else if (fillMethod === 'Random'){
        e.target.style.cssText = "background-color: hsl("+Math.random()*360+","+Math.random()*100+"%,"+Math.random()*100+"%)";
    }else if (fillMethod === 'Light Gradient'){
        //console.log(e);
        //if (console.logconsole.log(e.fromElement.style.backgroundColor);

        // if (fillTarget.getAttribute('style','background-color') == ""){
        // //if (e.fromElement.style.backgroundColor == ""){
        // //    e.target.style.cssText = "background-color: rgb(250,250,250)";
        //     alert("didn't expect this");

        //     e.target.style.cssText = "background-color: rgb(250,250,250)";

        // }else{
            changeGradient(fillTarget, 25);
        //}
    }else if (fillMethod === 'Dark Gradient'){
        changeGradient(fillTarget, -25);
    }

};
function changeGradient(fillTarget, changeAmount){ 
    let colors = fillTarget.getAttribute('style','background-color').split(',');
            //colors.forEach((element) => console.log(element))
            let red = Math.round(parseFloat(colors[0].split('(')[colors[0].split('(').length-1])+changeAmount);
            let green = Math.round(parseFloat(colors[1])+changeAmount);
            let blue = Math.round(parseFloat(colors[2].split(')')[0])+changeAmount);
            //console.log("background-color: rgb("+red+", "+green+", "+blue+")");
            fillTarget.setAttribute('style','background-color: rgb('+red+','+green+','+blue+');')
            //e.target.style.cssText = "background-color: rgb("+red+", "+green+", "+blue+")";
}


const container = document.querySelector('#container');

const grid = document.createElement('div');
//let gridSize = getComputedStyle(container)//.grid-template-columns
let fillMethod = "black";

populateGrid(16);
const clearbtn = document.querySelector('#clear');
clearbtn.addEventListener('click', resetGrid);
const colorbtn = document.querySelectorAll(".color");
colorbtn.forEach((button) => button.addEventListener('click', changeFillMethod));
//colorbtn.addEventListener;

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
    const newSize = prompt("What would you like the new size of the grid to be?")
    if (!isNaN(newSize)) {
        populateGrid(newSize);

    }else if (newSize !== null){
        alert("Please enter a number.");
        resetGrid();
    }
    
}

function populateGrid(gridSize){//create grid with size of input
    const container = document.querySelector('#container');
    container.setAttribute('style','grid-template: repeat('+gridSize+',1fr) / repeat('+gridSize+',1fr); background: hsl(360,50%,50%);');
    for (let i = 1; i <=gridSize*gridSize;i++){
        //console.log(i);
        let tempElement = document.createElement('div');
        //grid.createElement('div');
        tempElement.classList.add('box');
        //tempElement.textContent = 'test'+i;
        container.appendChild(tempElement);

    }
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((square) => square.addEventListener('mouseenter', mouseOver));
}
function mouseOver(e) {
    const fillMethod = document.querySelector(".selected").innerText;
    if (fillMethod === 'Black'){
        e.target.style.cssText = "background-color: hsl(0,0%,0%)";
    }else if (fillMethod === 'Random'){
        e.target.style.cssText = "background-color: hsl("+Math.random()*360+","+Math.random()*100+"%,"+Math.random()*100+"%)";
    }else if (fillMethod === 'Gradient'){
        console.log(e);
        //if (console.logconsole.log(e.fromElement.style.backgroundColor);
        //if (e.bgColor === ""){
         //   e.bgColor
        //}
    }
    //this.classList.add('filled');
};



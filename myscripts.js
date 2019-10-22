const container = document.querySelector('#container');

const grid = document.createElement('div');
let gridSize = getComputedStyle(container)//.grid-template-columns

//grid.classList.add('box');
//grid.textContent = 'test';
//const grid2 = document.createElement('div');
//grid2.classList.add('box');
//grid2.textContent = 'test2';
//let tempElement = document.createElement('div');
populateGrid(16);
const clearbtn = document.querySelector('#clear');
clearbtn.addEventListener('click', resetGrid);

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
    container.setAttribute('style','grid-template: repeat('+gridSize+',1fr) / repeat('+gridSize+',1fr);');
    for (let i = 1; i <=gridSize*gridSize;i++){
        //console.log(i);
        let tempElement = document.createElement('div');
        //grid.createElement('div');
        tempElement.classList.add('box');
        //tempElement.textContent = 'test'+i;
        container.appendChild(tempElement);

    }
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(square => square.addEventListener('mouseenter', mouseOver));
}
function mouseOver(e) {
    this.classList.add('filled');
};



window.addEventListener("load",game);
document.getElementById("reset").addEventListener("click", generateBoard)
function game(){
  generateBoard();
}

function generateBoard() {
    let matrix = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,""];
    shuffle(matrix);
    createField(matrix);
}

function createField(matrix){
    let  $container = document.querySelector('[data-component="field15"]');
    $container.innerHTML='';

    let $elements = [];
    let table = document.createElement("table");
    for (let i = 0; i < 4; i++){
        let row = document.createElement("tr");
        for (let j = 0;j < 4; j++){
            let $el = document.createElement("td");
            $el.innerHTML = matrix[i*4+j];
            $el.addEventListener("click",onClick);
            // ($elements);
            row.appendChild($el);
            $elements.push($el);
        }
        table.appendChild(row);
    }
    $container.appendChild(table);
}

function onClick(event){
    let $elements = document.querySelectorAll('td');
    let $el = event.target;
    let x = $el.cellIndex;
    let y = $el.parentElement.rowIndex;

    let pos = checkNeighbours(x,y,$elements);
    if (pos!==false){ ///i don`t write if (pos) because pos can be 0
        $elements[pos].innerHTML = event.target.innerHTML;
        event.target.innerHTML = "";
    }

    const matrix = [];
    $elements.forEach(element => matrix.push(element.innerHTML));
    if (victorySolution(matrix)) {
        alert ("Victory!!");
    }
}

function victorySolution(arr){
    const victoryArr = "123456789101112131415"
    if (arr.join("") === victoryArr)return true
    return false
}

function checkNeighbours(x, y, elements){
    if (elements[downNeighbour(x,y)] && elements[downNeighbour(x,y)].innerHTML==="") {
        return downNeighbour(x,y);
    }else if (elements[leftNeighbour(x,y)] && elements[leftNeighbour(x,y)].innerHTML===""){
        return leftNeighbour(x,y);
    }else if (elements[rightNeighbour(x,y)] && elements[rightNeighbour(x,y)].innerHTML==="") {
        return rightNeighbour(x,y);
    }else if (elements[topNeighbour(x,y)] && elements[topNeighbour(x,y)].innerHTML==="") {
        return topNeighbour(x,y);
    }
    return false;
}

function leftNeighbour(x,y) {
    if (x>0) {
        return x - 1 + (y) * 4;
    }
}

function rightNeighbour(x,y) {
    if (x<3) {
        return x + 1 + (y) * 4;
    }
}

function downNeighbour(x,y) {
    return x + (y + 1) * 4;
}

function topNeighbour(x,y){
    return x + (y - 1) * 4;
}

function shuffle(arr){
    for (let i = 15;i>0;i--){
        let j = Math.floor(Math.random() * (i))
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
}





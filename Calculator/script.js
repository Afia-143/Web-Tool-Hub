function appendValue(value){
    const screen = document.getElementById("screen");
    screen.innerText += value;
}

function clearScreen(){
    const screen = document.getElementById("screen");
    screen.innerText = "";
}

function deleteLast(){
    const screen = document.getElementById("screen");
    screen.innerText = screen.innerText.slice(0, -1);
}

function calculateResult(){
    const screen = document.getElementById("screen");
    let expression = screen.innerText;
    expression = expression.replace(/÷/g, "/").replace(/x/g, "*");

    try{
        const result = eval(expression);
        screen.innerText = result;
    } catch(error){
        screen.innerText = "Error";
    }
}

function square(){
    let screen = document.getElementById("screen");
    let value = parseFloat(screen.innerText);
    if(!isNaN(value)){
        screen.innerText = value * value;
    }
    else{
        screen.innerText = "Error";
    }
}

function squareRoot(){
    let screen = document.getElementById("screen");
    let value = parseFloat(screen.innerText);
    if(!isNaN(value) && value >= 0){
        screen.innerText = Math.sqrt(value);
    }
    else{
        screen.innerText = "Error";
    }
}

function factorial(){
    let screen = document.getElementById("screen");
    let value = parseFloat(screen.innerText);
    if(!isNaN(value) && Number.isInteger(value) && value >=0){
        let result = 1;
        for(let i = 2; i <= value; i++){
            result *= i;
        }
        screen.innerText = result;
    }
    else{
        screen.innerText = "Error";
    }
}
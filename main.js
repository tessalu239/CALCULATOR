const display1= document.querySelector('.display-1');
const display2= document.querySelector('.display-2');
const displayResult= document.querySelector('.display-result');
const displayNum= document.querySelectorAll('.number');
const displayOp= document.querySelectorAll('.operators');
const displayClear= document.querySelector('.clear');
const displayClearEntity= document.querySelector('.clear-entity');
const displayEqual=document.querySelector('.btn-equal');

let dis2='';
let dis1='';
let disResult=null;
let lastOperation='';
let haveDot;

//Input number
displayNum.forEach(number=>{
    number.addEventListener('click',e=>{
        if(e.target.innerText==='.'&& !haveDot){
            haveDot=true;
        } else if(e.target.innerText==='.'&& haveDot){
            return;
        }
        dis2+=e.target.innerText;
        display2.innerText=dis2;
    })
})

//input operators
displayOp.forEach(operators=>{
    operators.addEventListener('click',e=>{
        if(!dis2){
            return;
        }
        haveDot=false;
        const operatorName=e.target.innerText;
        if(dis1&&dis2&&lastOperation){
            mathFunction();
        }else{
            disResult=parseFloat(dis2);
        }
        moveNclearCurrent(operatorName);
        lastOperation=operatorName;
        console.log(disResult);
    })
})
function mathFunction(){
    if(lastOperation==='x'){
        disResult=parseFloat(disResult)*parseFloat(dis2);
    }else if(lastOperation==='/'){
        disResult=parseFloat(disResult)/parseFloat(dis2);
    }else if(lastOperation==='-'){
        disResult=parseFloat(disResult)-parseFloat(dis2);
    }else if(lastOperation==='+'){
        disResult=parseFloat(disResult)+parseFloat(dis2);
    }else if(lastOperation==='%'){
    disResult=parseFloat(disResult)%parseFloat(dis2);
    }
}
function moveNclearCurrent(name=''){
    dis1=dis2+''+ name+ '';
    display1.innerText=dis1;
    display2.innerText='';
    dis2='';
    displayResult.innerText=disResult;
}

//final result after click equal
displayEqual.addEventListener('click',e=>{
    if(!dis1||!dis2){
        return;
    }
    haveDot=false;
    mathFunction();
    moveNclearCurrent();
    display2.innerText=disResult;
    displayResult.innerText='';
    dis2=disResult;
    dis1='';
})

//clear all
displayClear.addEventListener('click',e=>{
    display1.innerText='0';
    display2.innerText='0';
    dis1='';
    dis2='';
    disResult='';
    displayResult.innerText='0';
})

//clear last input
displayClearEntity.addEventListener('click',e=>{
    dis2='';
    display2.innerText='';
})

//connect with computer keyboard
window.addEventListener('keydown',e=>{
    if(
        e.key==='0'||
        e.key==='1'||
        e.key==='2'||
        e.key==='3'||
        e.key==='4'||
        e.key==='5'||
        e.key==='6'||
        e.key==='7'||
        e.key==='8'||
        e.key==='9'||
        e.key==='.'
    ){
        keyboardNumBtn(e.key);   
    } else if(
        e.key==='%'||
        e.key==='/'||
        e.key==='-'||
        e.key==='+'
    ){
        keyboardOpBtn(e.key);
    }else if(e.key==='*'){
        keyboardOpBtn('x');
    } else if(
        e.key==='='||
        e.key==='Enter'
    ){
        keyboardResultBtn();
    }
})

function keyboardNumBtn(key){
displayNum.forEach(button=>{
    if(button.innerText===key){
        button.click();
    }
})
}

function keyboardOpBtn(key){
    displayOp.forEach(button=>{
        if(button.innerText===key){
            button.click();
        }
    })
}
function keyboardResultBtn(){
    displayEqual.click();
}

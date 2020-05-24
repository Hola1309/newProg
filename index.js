const rulesValue = document.getElementById('value-of-rules');
const list = document.getElementById('variable');
const myRule = document.getElementById('myRule');
const a = document.getElementById('a');
const b = document.getElementById('b');
const c = document.getElementById('c');
const leftBorder = document.getElementById('left-border');
const rightBorder = document.getElementById('right-border');
const varname = document.getElementById('name-of-var');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const myvars = document.getElementById('myVars');

myvars.addEventListener('click', (event) =>{
  let i= event.target.innerText.split(',')
  ctx.clearRect(0, 0, 500, 250);
  grid()
  graph(+i[0], +i[1], +i[2], +i[3], +i[4], 'red')
  graph(+i[0], +i[1], +i[0], +i[3], +i[4], 'green')
  graph(+i[0], +i[1], +i[1], +i[3], +i[4], 'blue')
})

function clear(){
  for (i=1; i<=+localStorage.getItem('count'); i++){
    document.querySelectorAll("#id")[i].innerText = '';
    document.querySelectorAll("#rule")[i].innerText = '';
  }
  
}

var pullofRules1 = [];
var pullofRules = [];

function fill(){
  clear()
  for (i=0; i<=+localStorage.getItem('count'); i++){

    document.querySelectorAll("#rule")[i].innerText = JSON.parse( localStorage.getItem(i));
  }
}
function fillVars(){
  let varkeys = JSON.parse(localStorage.getItem('varkeys'))
  for (i=0; i<varkeys.length; i++){
  document.querySelectorAll('#name')[i].innerText = varkeys[i]
  document.querySelectorAll('#var')[i].innerText = JSON.parse(localStorage.getItem(varkeys[i]))
  }
}
function count(){
  i = JSON.parse( localStorage.getItem('count'))
  i++;
  localStorage.setItem('count' , i);
}

function clearSrearch(){
  pullofRules = [];
  pullofRules1 = [];
  for (i=1; i<=+localStorage.getItem('count'); i++){
    pullofRules.push(JSON.parse( localStorage.getItem(i)))
  } 
  fill()
  document.getElementById('test').value = ''
  document.getElementById('myRule').value = ''
  return pullofRules, pullofRules1;
  
}

function calculate(a){
  clear()
  let k = pullofRules.length;
  // let a = myRule.value.toString();
  for (i=0; i<k; i++){
    for(j=0; j<pullofRules[i].length; j++){
      if(a == pullofRules[i][j]){
        pullofRules1.push(pullofRules[i])
      }
    }

  }
 
  pullofRules = pullofRules1;
  pullofRules1 = [];
  for (i=0; i<pullofRules.length; i++){
    document.querySelectorAll("#rule")[i].innerText = pullofRules[i]

  }
  return pullofRules1
}

function createRule(){
    count()
    localStorage.setItem(JSON.parse( localStorage.getItem('count')) , JSON.stringify(rulesValue.value.split(', ')));
    rulesValue.value = ''
    //console.log(JSON.parse( localStorage.getItem(key)))
}

function createVar(){
  let varValues = [leftBorder.value, rightBorder.value, a.value, b.value, c.value]
  let varkeys = JSON.parse( localStorage.getItem('varkeys'));
  varkeys.push(varname.value);
  localStorage.setItem(varname.value , JSON.stringify(varValues));

  localStorage.setItem('varkeys', JSON.stringify(varkeys));
  //console.log(JSON.parse( localStorage.getItem(key)))
}


function graph(l, r, a, b, c, color){
  
  let xCoord = 0;
  let i = 0;
  let x = 0;
  let y = 250;
  let xStep = (+r - l)/50
  ctx.beginPath();
  ctx.moveTo(x, 250 - 1/(1 + ((+l - a)/b)**c)*250);
  while(xCoord < 500){
    
  y = 1/(1 + ((+l + i*xStep - a)/b)**c);
  xCoord = xCoord + 10;
  // console.log(xCoord, y)
  y = 250 - y*250;
  
  ctx.lineTo(xCoord, y);
  i++;
  }
  ctx.strokeStyle = color;
  ctx.stroke();
}
function grid(){
  let x1 = 0,y1 =0,x2 = 500,y2 = 0;
  
  while (y1 <= 250) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y1);
    ctx.strokeStyle = "black";
    ctx.stroke();
    y1= y1+25;
    
  }
  x1=0;
  y1=0;
  y2=250;

  while (x1 <= 500) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y2);
    ctx.strokeStyle = "black";
    ctx.stroke();
    x1= x1+50;
    
  }
 

}
function truevar(x, a, b, c) {
  var result = 1/(1+((x-a)/b)**c)
  
  
}
function test(){
  let myVar = document.getElementById('test').value.split('=');
  let i = JSON.parse( localStorage.getItem(myVar[0]))
  let myarr = [];
  let myresult = ['низкая', 'нормальная', 'высокая']
  let max = 0;
  let id = 0;
  myarr.push(1/(1+((myVar[1]-i[0])/i[3])**i[4]))
  myarr.push(1/(1+((myVar[1]-i[2])/i[3])**i[4]))
  myarr.push(1/(1+((myVar[1]-i[1])/i[3])**i[4]))
  for (i = 0; i<myarr.length; i++){
    if (myarr[i] > max){
      max = myarr[i];
      id = i;
    }
  }
  alert(myVar[0] + '=' + myresult[id] + ' с увернностью: '+ max);
  calculate(myVar[0] + '=' + myresult[id]);
  document.getElementById('test').value = ''
}
fill()
grid()

clearSrearch()
fillVars()
  // for(let i=0; i<localStorage.length; i++) {
  //   let key = localStorage.key(i);
  //   let a = JSON.parse( localStorage.getItem(key))
  //   for(j=0; j<a.length-1; j++){
  //       let option = document.createElement('option');
  //       option.value = a[j];   
  //       list.appendChild(option);
  //   }
  // }
// console.log( JSON.parse( localStorage.rule )[0][1] ); 

//let result = true ? console.log('ok'):console.log('not ok')
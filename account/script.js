//
// let listPlaceholders = () => {
//
//   let input = document.querySelectorAll('input');
//   for (i = 0; i < input.length; i++)
//   {
//     if (input[i].attributes.placeholder)
//     {
//       console.log('yes!' + input[i].attributes.placeholder.value);
//     }
//   }
// };
//document.addEventListener("DOMContentLoaded", listPlaceholders);
let dataArray  = [];
if (localStorage.getItem('data')!==null){
  dataArray = JSON.parse(localStorage.getItem("data"));

};

// let placeholder = (field) => {
//
//   };
function divCreateInc(a, index) {
  let div = document.createElement('div');
            div.classList.add("incomes");
            inc.appendChild(div);
            for (i=0; i<(a.length-1); i++)
              {
                let span = document.createElement('span');
                span.innerHTML = a[i];
                div.appendChild(span);
              }
              let span = document.createElement('span');
              span.innerHTML = `X`;
              span.classList=('removal');
              span.onclick = function(){
                if (confirm('Are you sure?') === true) {
                dataArray.splice(index, 1); refresh();localStorage.setItem("data", JSON.stringify(dataArray));}}
              div.appendChild(span);
            }

function divCreateExp(a, index) {
    let div = document.createElement('div');
              div.classList.add("expenditures");
              exp.appendChild(div);
              for (i=0; i<(a.length-1); i++)
                {
                  let span = document.createElement('span');
                  span.innerHTML = a[i];
                  div.appendChild(span);
                }
                let span = document.createElement('span');
                span.innerHTML = `X`;
                span.classList=('removal');
                span.onclick = function(){
                  if (confirm('Are you sure?') === true) {
                  dataArray.splice(index, 1); refresh();localStorage.setItem("data", JSON.stringify(dataArray));}}
                div.appendChild(span);
              }
let total = 0;
let inc = document.getElementById('inc');
let exp = document.getElementById('exp');
let description = document.getElementById('description');
let amount = document.getElementById('amount');
let date = document.getElementById('date');
let time = document.getElementById('time');
let place = document.getElementById('place');
let main = document.querySelector('main');
let select = document.getElementById('selector');
//console.log(select.value);
let option = document.querySelectorAll('option');
// let button = document.querySelector('button');
//     button.addEventListener('click', function(){add()});
const twoDigit = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  else return number;
}

let balance = document.getElementById('balance');
const refresh=()=>{
  // description.value='';
  // amount.value='';
  exp.innerHTML = '';
  inc.innerHTML = '';
  if (dataArray) {
    total = 0;
    inc.innerHTML = '<h2>Incomes</h2><br>';
    exp.innerHTML = '<h2>Expenses</h2><br>';
    for (j=0;j<dataArray.length;j++)
      {

        if (dataArray[j][5]=== '0')
          {
            //console.log('inc: ' + dataArray[j][5]);
            divCreateInc(dataArray[j], j);
            //console.log(dataArray[j]);
            let someData = dataArray[j][3].split(' ');
            //console.log(someData[1]);
            total += parseInt(someData[0], 10);
          }
        else if (dataArray[j][5] === '1')
          {
            //console.log('exp: ' + dataArray[j][5]);
            divCreateExp(dataArray[j], j);
            let someData = dataArray[j][3].split(' ');
            //console.log(someData[1]);
            total -= parseInt(someData[0], 10);
          }
      }

  balance.innerHTML= `Balance: ${total} €` ;

}}
function clear() {
  localStorage.clear();
  dataArray = [];
  refresh();
}
//   if (dataArray.length > 1)
//     {
//     dataArray.sort(compare(a,b));
//     for (i=0;i<dataArray.length;i++)
//       {
//       divCreate(dataArray[i]);
//       }
//     }
//   else divCreate(dataArray[0]);
//   //let array = ['Info: ' + description.value, `Date: ${twoDigit(d.getDate())} / ${twoDigit(d.getMonth())} / ${d.getFullYear()}`, 'Cash: ' + total(), placeValue ];
// };
// function compare(a,b) {      //for comparing strings
//     return new Date(b[1]) - new Date(a[1]);
//  }
const add = () => {
  if (description.checkValidity() && amount.checkValidity()) {
    let placeValue;
    if (place.value) {placeValue = `Place: ${place.value}`;}
    else {placeValue = '';}
    let clock;
    let d = new Date();
    if (time.value) {
      clock = time.value;
    }
    else {clock = `${d.getHours()}:${d.getMinutes()}`}
    if (!date.value) {

      let array = ['Info: ' + description.value, `${twoDigit(d.getDate())}/${twoDigit(d.getMonth()+1)}/${d.getFullYear()}`, clock, `${amount.value} €`, placeValue, select.value ];
      //divCreate(array);
      dataArray.push(array);
      console.log(`pushing data to array: ${array}`)
      refresh();
      }

    else {
      console.log('here');
      let formatedDate = date.value.split('-');
      let array = ['Info: ' + description.value, `${formatedDate[2]}/${formatedDate[1]}/${formatedDate[0]}`, clock, `${amount.value} €`, placeValue, select.value ];
      //divCreate(array);
      dataArray.push(array);
      refresh();
    }
    localStorage.setItem("data", JSON.stringify(dataArray));


}};
function eraseAll()
      {
      if (confirm('This will reset all data! Want to continue?') === true)
        {
        localStorage.clear();
        dataArray=[];
        refresh();
        }
      }



refresh();

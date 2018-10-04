//keys in data file for reference:
//firstName:lastName:title:Nationality:src:alt:skills:[],
//whySofterDeveloper:longTermVision:motivatesMe:favoriteQuote:joinedOn:
let folder = 'smurfs'; // or images
let adjustment = 800; //for well scaled pictures to 120px width this value ought to be 600
let choice = document.getElementById('choice');
let info = document.getElementById('info');
let infoImage = document.getElementById('infoImage');
let dataIn = document.getElementById('data');
let downFlag;
let currentPic = '';
data.forEach(pic => {
  let img = document.createElement('img');
  img.alt = `${folder}/${pic.alt}`;
  img.src = `${folder}/${pic.src}`;
  img.setAttribute('draggable', false);
  img.setAttribute('ondragstart', 'return false;');
  //img.setAttribute('onmouseup', `showPhoto(${pic})`);
  img.onmousedown = function(){currentPic = pic.src};
  img.onmouseup = function(){
    if (currentPic === pic.src){
    infoImage.src=`${folder}/${pic.src}`;
    infoImage.alt=`${folder}/${pic.alt}`;
    dataIn.innerHTML = `
    <b>Name:</b> ${pic.firstName.charAt(0).toUpperCase() + pic.firstName.slice(1)} <br />
    <b>Nationality:</b> ${pic.nationality.charAt(0).toUpperCase() + pic.nationality.slice(1)} <br />
    <b>Motiveted by:</b> ${pic.motivatesMe} <br />
    <b>Favourite quote:</b> ${pic.favoriteQuote} <br />
    <b>Skills:</b>
    <ul></ul>`;
    let list = document.querySelector('ul');
    for (i=0; i<pic.skills.length; i++) {
    let li = document.createElement('li');
    li.textContent = pic.skills[i];
    list.appendChild(li);}
  }}
  choice.appendChild(img);
  });
let position= {x: 0, y: 0};
document.body.onmouseup = function () {
  downFlag = false;
}
function showPhoto(p) {
  console.log(p.src);
}
choice.addEventListener('mousedown', function(e){
  downFlag = true;
  position.x = e.pageX - this.offsetLeft;
  position.y = e.pageY - this.offsetTop;
  //console.log(position);
  });
// choice.onmouseup = function (up) {
//   downFlag = false;
// };
choice.style.right='0px';
var timestamp = null;
var lastMouseX = null;
var lastMouseY = null;
choice.onmousemove = function(move) {

  if (downFlag) {
    if (position.X !== move.clientX) {

      let calc = parseInt(choice.style.right.slice(0, -2), 10);
      //console.log(calc);
    //console.log('Acceleration calculation', );
    if (timestamp === null) {
        timestamp = Date.now();
        lastMouseX = move.screenX;
        lastMouseY = move.screenY;
        return;}
        var now = Date.now();
    var dt =  now - timestamp;
    var dx = move.screenX - lastMouseX;
    var speedX = Math.round(dx / dt * 30);
    //console.log(speedX);

    timestamp = now;
    lastMouseX = move.screenX;
    //console.log(speedX);
    if (calc <= ((data.length+1)*120) && calc >= 0)
    { calc -= speedX;
      if (calc < 0) {calc = 0;
        }
      else if (calc > ((data.length+1)*120-adjustment)) {calc = ((data.length+1)*120)-adjustment;}
      choice.style.right = `${calc}px`;
    }

  }
}}



//max range or right: 1440px;

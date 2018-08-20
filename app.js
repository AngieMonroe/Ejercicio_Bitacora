const btnSend = document.getElementById("send");
const title = document.getElementById("title");
const message = document.getElementById('message');
const activitys = document.getElementById("activitys");

btnSend.addEventListener('click', element => {
    let titleM = title.value;
    let messageM = message.value;
    firebase.database().ref('day').push();
    let dayNew = firebase.database().ref('day').push();
    let keyDay = dayNew.getKey();
    firebase.database().ref(`day/${keyDay}`).set({
      title: titleM,
      message: messageM
    })
    title.value = '';
    message.value = '';
  });
  
  function processFiles(files) {
    let file = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
    let image = document.getElementById("image"); 
    image.style.backgroundImage = "url('" + e.target.result + "')";
    console.log("url('" + e.target.result + "')");
    };
    reader.readAsDataURL(file);
    }  

let containerCircle;
let elementMove;

window.addEventListener('load', init);
function init() {
  containerCircle = document.querySelector('.container-circle')
  containerCircle.addEventListener('dragover', dragOverContainer, false);
  containerCircle.addEventListener('dragleave', dragExitContainer, false);
  containerCircle.addEventListener('drop', manejarDrop, false);

  let circles = document.getElementsByClassName('circle');
  for (i in circles){
    let circle = circles[i];
    let x = random(0, 90);
    let y = random(0, 90);
    if(typeof circle.style != "undefined"){
      circle.style.top = y + '%';
      circle.style.left = x + '%';
      circle.addEventListener('dragstart', dragStart,false);
      circle.addEventListener('dragend', dragEnd,false);
    }
  }
}

function dragStart(e){
  this.style.backgroundColor = 'gray';
  elementMove = this;
  let padre = document.createElement('p');
  let clone = this.cloneNode(true);
  padre.appendChild(clone);
  e.dataTransfer.setData('text', padre.innerHTML);
}

function manejarDrop(e){
  e.preventDefault();
  let datos = e.dataTransfer.getData('text');
  this.innerHTML += datos;
  elementMove.parentNode.removeChild(elementMove)
  this.classList.remove('over')
  
}

function dragOverContainer(e){
  e.preventDefault();
  this.classList.add('over');
}

function dragExitContainer(e){
  e.preventDefault();
  this.classList.remove('over');  

}

function dragEnd(e){
  this.style.backgroundColor = 'salmon';
}

function random (min, max) {
  return Math.floor(Math.random()* (max-min + 1)) + min;
}

database.ref('day').on('value', function(snapshot) {
  activitys.innerHTML = '';
  snapshot.forEach(function(element) {
    let data = element.val();
    console.log(data)
    activitys.innerHTML +=
    `<!-- Card -->
    <div class="card">
            <!-- Card content -->
            <div class="card-body">
              <!-- Title -->
              <h5 class="card-title">${data.title}</h5>
              <hr>
              <!-- Text -->
              <p class="card-text">${data.message}</p>
            </div>
            <!-- Card footer -->
            <div class="rounded-bottom mdb-color lighten-3 text-center pt-3">
            </div>
          
          </div>
          <!-- Card -->`;
  });
});
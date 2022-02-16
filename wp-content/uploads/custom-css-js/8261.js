<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
let down = true;

function scrollBottom( idElement ) { 
  
  if ( document.querySelector('#' + idElement).parentElement.parentElement.scrollTop > 50 ) {
    document.querySelector('#' + idElement).parentElement.parentElement.scroll({ top: 0, behavior: 'smooth' });  
    document.querySelector('#' + idElement + ' .icon-arrow-down').style.transform = 'rotate(0deg)';
  } else {
    document.querySelector('#' + idElement).parentElement.parentElement.scrollBy({ top: 600, behavior: 'smooth' });
    document.querySelector('#' + idElement + ' .icon-arrow-down').style.transform = 'rotate(180deg)';
  }
}




const urlImg = "https://visual2etex.com/wp-content/uploads/2021/12/";
const plane1And7 = document.querySelectorAll(".model-plane-one");
for (i = 0; i < plane1And7.length; i++) {
  plane1And7[i].onclick = () => { openInfoPlane(urlImg + "plano-apartamento-1.png") };
}

const planeTwo = document.querySelectorAll(".model-plane-two");
for (i = 0; i < planeTwo.length; i++) {
  planeTwo[i].onclick = () => { openInfoPlane(urlImg + "plano-apartamento-17-23-78.png") };
}

const planeThree = document.querySelectorAll(".model-plane-three");
for (i = 0; i < planeThree.length; i++) {
  planeThree[i].onclick = () => { openInfoPlane(urlImg + "plano-apartamento-51-77-88.png") };
}

const planeFour = document.querySelectorAll(".model-plane-four");
for (i = 0; i < planeFour.length; i++) {
  planeFour[i].onclick = () => { openInfoPlane(urlImg + "plano-apartamento-90-91.png") };
}

const planeFive = document.querySelectorAll(".model-plane-five");
for (i = 0; i < planeFive.length; i++) {
  planeFive[i].onclick = () => { openInfoPlane(urlImg + "plano-apartamento-94-171.png") };
}

document.querySelector(".model-plane-8").addEventListener("click", () => { openInfoPlane(urlImg + "plano-apartamento-8.png") }, false);
document.querySelector(".model-plane-11").addEventListener("click", () => { openInfoPlane(urlImg + "plano-apartamento-11.png") }, false);
document.querySelector(".model-plane-12").addEventListener("click", () => { openInfoPlane(urlImg + "plano-apartamento-12.png") }, false);
document.querySelector(".model-plane-61").addEventListener("click", () => { openInfoPlane(urlImg + "plano-apartamento-61.png") }, false);
document.querySelector(".model-plane-76").addEventListener("click", () => { openInfoPlane(urlImg + "plano-apartamento-76.png") }, false);
document.querySelector(".model-plane-89").addEventListener("click", () => { openInfoPlane(urlImg + "plano-apartamento-89.png") }, false);
document.querySelector(".model-plane-99").addEventListener("click", () => { openInfoPlane(urlImg + "plano-apartamento-99.png") }, false);
document.querySelector(".model-plane-100").addEventListener("click", () => { openInfoPlane(urlImg + "plano-apartamento-100.png") }, false);


const openInfoPlane = ( urlImgPlane ) => {
  document.getElementById("mainContentPlane").style.display = "flex";
  document.getElementById("mostrarPlano").src = urlImgPlane;
}


document.querySelector("#goApartament").addEventListener("click", function() {
  location.href = '/apartamento-escandinavo/';
}, false);

document.querySelector("#closeContentPlane").addEventListener("click", function() {
  document.getElementById("mainContentPlane").style.display = "none";
  document.getElementById("mostrarPlano").src = "";
}, false);

document.querySelector("#mainContentPlane").addEventListener("click", function() {
  document.getElementById("mainContentPlane").style.display = "none";
  document.getElementById("mostrarPlano").src = "";
}, false);</script>
<!-- end Simple Custom CSS and JS -->

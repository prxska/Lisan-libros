
var toggle = document.getElementById('container');
var Header = document.querySelector('header');


toggle.onclick = function(){
  toggle.classList.toggle('active');
  Header.classList.toggle('active');
}
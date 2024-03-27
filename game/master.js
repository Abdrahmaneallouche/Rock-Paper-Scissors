let comptChoice=''
let quantComp = 0;
let quantUser = 0;
let result = '';


function loadStorage() {
  let quantityComp = JSON.parse(localStorage.getItem('quantComp'));
  let quantityUser = JSON.parse(localStorage.getItem('quantUser'));
  let resStorage = localStorage.getItem('result');
  
  if (quantityComp !== null && quantityUser !== null && resStorage !== null) {
      quantComp = quantityComp;
      quantUser = quantityUser;
      result = resStorage;
      
      document.querySelector('.user').innerHTML = quantUser;
      document.querySelector('.pc').innerHTML = quantComp;
      document.querySelector('.result').innerHTML = result;
  }
}
function saveStorage() {
  localStorage.setItem('quantComp', JSON.stringify(quantComp));
  localStorage.setItem('quantUser', JSON.stringify(quantUser));
  localStorage.setItem('result', result);
}
function restart() {
  quantComp = 0;
  quantUser = 0;
  result = '';
  
  document.querySelector('.user').innerHTML = quantUser;
  document.querySelector('.pc').innerHTML = quantComp;
  document.querySelector('.result').innerHTML = '';
  
  saveStorage();
}

document.querySelector('.restart').addEventListener('click', restart);

function decide(userChoice, comptChoice) {
  if (userChoice === comptChoice) {
      result = "It's a draw";
  } else if (
      (userChoice === 'rock' && comptChoice === 'scissors') ||
      (userChoice === 'paper' && comptChoice === 'rock') ||
      (userChoice === 'scissors' && comptChoice === 'paper')
  ) {
      result = 'You won';
      quantUser++;
  } else {
      result = "You've lost";
      quantComp++;
  }

  document.querySelector('.result').innerHTML = result;
  saveStorage();
}

function compMove() {
  let choices = ['rock', 'paper', 'scissors'];
  let randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}
function changeResult(result){
  let innerModal = document.getElementById('inner-modal');
  if (result === 'You won') {
    document.querySelector('.resulta').innerHTML = `You won <i class="fa-solid fa-crown text-yellow-400"></i>`;
    innerModal.style.cssText = 'background-color:#54B435; outline-color:#54B435';
  } else if (result === "You've lost") {
    document.querySelector('.resulta').innerHTML = `You've lost <i class="fa-solid fa-flag text-white"></i>`;
    innerModal.style.cssText = 'background-color:#ED2B2A; outline-color:#ED2B2A';
  } else {
    document.querySelector('.resulta').innerHTML = `It's a draw <i class="fa-solid fa-yin-yang text-black"></i>`;
    innerModal.style.cssText = 'background-color:#FFC700; outline-color:#FFC700';
  }
}


function modalOpen(result){
  let model=document.querySelector('.model')
  model.classList.add('open')
  let closeBtn=document.querySelector('.closeModal')
   closeBtn.addEventListener('click',()=>{
    model.classList.remove('open')
  })
  changeResult(result)
}

document.querySelectorAll('.chose').forEach((btn) => {
  btn.addEventListener('click', () => {
      let userChoice = btn.getAttribute('data-choice');
      let comptChoice = compMove();

      decide(userChoice, comptChoice);
      
      document.querySelector('.user').innerHTML = quantUser;
      document.querySelector('.pc').innerHTML = quantComp;
      modalOpen(result)
    
  });
});

loadStorage();
function playMusic(){
  let icon = document.querySelector('.music')
  let music= document.getElementById('play')
  icon.addEventListener('click',()=>{
    if(music.paused){
      music.play()
      icon.innerHTML=`<i class="fa-solid fa-volume-xmark text-white  transition-all"></i> `
    }else{
      music.pause()
      icon.innerHTML=`<i class="fa-solid fa-volume-high  text-white  transition-all"></i>` 
    }

  })
}

playMusic()
loadStorage()
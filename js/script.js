const lights = document.querySelectorAll('.light');
const button = document.getElementById('next');
const statusText = document.getElementById('status-text');
const timer = document.getElementById("timer");
const car = document.getElementById("car");

let currentIndex = 0;
let autoInterval = null;
let countdownInterval = null;
let nightInterval = null;
let timeLeft = 3;

function changeLight() {
  lights.forEach(light => light.classList.remove('active'));

  const currentLight = lights[currentIndex];
  currentLight.classList.add('active');

  if (currentLight.classList.contains('red')) {
    statusText.textContent = "Lampu Merah - BERHENTI";
    statusText.style.color = "red";
    timeLeft = 3;
  } 
  else if (currentLight.classList.contains('yellow')) {
    statusText.textContent = "Lampu Kuning - BERSIAP";
    statusText.style.color = "yellow";
    timeLeft = 2;
  } 
  else if (currentLight.classList.contains('green')) {
    statusText.textContent = "Lampu Hijau - JALAN";
    statusText.style.color = "green";
    timeLeft = 4;
  }

  if (car) {
    if (currentLight.classList.contains('green')) {
      car.style.left = "300px";
    } else {
      car.style.left = "0px";
    }
  }

  currentIndex = (currentIndex + 1) % lights.length;
}

if (button) {
  button.addEventListener('click', changeLight);
}

function toggleAuto() {
  stopAll();

  autoInterval = setInterval(changeLight, 2000);
}

function startCountdown() {
  stopAll();

  if (timer) timer.textContent = timeLeft; 

  countdownInterval = setInterval(() => {
    if (timer) timer.textContent = timeLeft;

    timeLeft--;

    if (timeLeft < 0) {
      changeLight();
    }
  }, 1000);
}

function toggleNightMode() {
  if (nightInterval) {
    clearInterval(nightInterval);
    nightInterval = null;
    changeLight();
    return;
  }

  stopAll();

  nightInterval = setInterval(() => {
    lights.forEach(light => light.classList.remove('active'));
    const yellow = document.querySelector('.yellow');
    if (yellow) yellow.classList.toggle('active');
  }, 500);
}

function stopAll() {
  clearInterval(autoInterval);
  clearInterval(countdownInterval);
  clearInterval(nightInterval);

  autoInterval = null;
  countdownInterval = null;
  nightInterval = null;
}

changeLight();

function emergencyMode() {
  stopAll();

  lights.forEach(light => light.classList.remove('active'));
  document.querySelector('.green').classList.add('active');

  statusText.textContent = "MODE DARURAT - JALAN TERUS";
  statusText.style.color = "blue";

  if (car) car.style.left = "300px";
}
let countdown = 5;
const countdownEl = document.getElementById('countdown');
const loginScreen = document.getElementById('loginScreen');
const terminal = document.getElementById('terminal');
const log = document.getElementById('log');
const input = document.getElementById('commandInput');
const keySound = document.getElementById('keySound');
const mainPage = document.getElementById('mainPage');
const introText = document.getElementById('introText');

let history = [];
let historyIndex = -1;

const logs = [
  'System breach log loaded...',
  'Darknet protocol handshake established...',
  'Scanning target environment...',
  'Recon modules initialized...',
  'Welcome to Darknet Detectives Terminal'
];

const commands = {
  help: 'Available commands: help, whoami, scan, clear, members',
  whoami: 'You are an elite analyst under codename: Phantom_Zero',
  members: 'Core Members:\n- Specter\n- ShadowFox\n- Cypher\n- BlackICE',
  scan: '[+] Initiating scan...\n[*] Ports 21, 22, 80, 443 found.\n[*] Services: Apache, SSH, FTP detected.',
  clear: 'clear'
};

function startCountdown() {
  const timer = setInterval(() => {
    countdown--;
    countdownEl.textContent = countdown;
    if (countdown <= 0) {
      clearInterval(timer);
      loginScreen.classList.add('hidden');
      terminal.classList.remove('hidden');
      playLogs();
    }
  }, 1000);
}

function playLogs() {
  let i = 0;
  const typer = setInterval(() => {
    if (i < logs.length) {
      log.innerHTML += logs[i] + "\n";
      i++;
    } else {
      clearInterval(typer);
      setTimeout(showMainPage, 2000); // delay before showing main
    }
  }, 1000);
}

function showMainPage() {
  terminal.classList.add('hidden');
  mainPage.classList.remove('hidden');
  document.body.style.overflowY = 'auto'; // enable scroll when main page is shown

  const overlay = document.querySelector('.overlay');
  if (overlay) overlay.classList.add('hidden');

  const mainIntro = "Hello, we are Darknet Detectives team! We work for the security of the country! " +
    "And if you want to work shoulder to shoulder with us, then contact us. Our email and telegram links are given below! " +
    "We have two sectors: Junior and Senior. Here are the core members...";

  // ✅ Only enable sound here
  typeTextWithSound(mainIntro, introText, true);
}

function typeTextWithSound(text, element, enableSound = false, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);

      // ✅ Only play sound if enabled and character is not a space
      if (enableSound && keySound && text.charAt(i) !== ' ') {
        if (keySound.paused) {
          keySound.currentTime = 0;
          keySound.play().catch(() => {});
        }
      }

      i++;
      setTimeout(type, 40);
    } else {
      if (enableSound && keySound) {
        keySound.pause();
        keySound.currentTime = 0;
      }
      if (callback) callback();
    }
  }
  type();
}

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const cmd = input.value.trim();
    if (cmd) history.push(cmd);
    historyIndex = history.length;

    if (cmd === 'clear') {
      log.textContent = '';
    } else if (commands[cmd]) {
      log.innerHTML += `\n$ darknet@detectives:~$ ${cmd}\n${commands[cmd]}\n`;
    } else {
      log.innerHTML += `\n$ darknet@detectives:~$ ${cmd}\nCommand not found`;
    }
    input.value = '';
    log.scrollTop = log.scrollHeight;
  } else if (e.key === 'ArrowUp') {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      input.value = '';
      historyIndex = history.length;
    }
  } else {
    // ❌ Disable key sound during terminal input typing
  }
});

startCountdown();

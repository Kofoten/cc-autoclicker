const CheatEngine = {
  clickerInterval: null, // Interval for simulating big cookie clicks.
  managerInterval: null, // Interval for managing rare events; clicking golden cookies, popping wrinklers etc.
  isRunning: false,
};

function clickShimmers() {
  document.querySelectorAll('.shimmer').forEach(x => x.click());
}

function manageWrinklers() {
  const maxWrinklerCount = Game.getWrinklersMax();
  let activeWrinklerCount = 0;
  let fattest = { sucked: -1 };

  for (let i = 0; i < maxWrinklerCount; i++) {
    const w = Game.wrinklers[i];
    if (w.close === 1) {
      activeWrinklerCount++;
      if (w.type === 0 && w.sucked > fattest.sucked) {
        fattest = w;
      }
    }
  }

  if (activeWrinklerCount === maxWrinklerCount) {
    fattest.hp = 0;
  }
}

function clicker() {
  Game.ClickCookie();
}

function manager() {
  clickShimmers();
  manageWrinklers();
}

function toggleCheats(event) {
  if (CheatEngine.isRunning) {
    clearInterval(CheatEngine.clickerInterval);
    clearInterval(CheatEngine.managerInterval);
    CheatEngine.isRunning = false;
  } else {
    CheatEngine.clickerInterval = setInterval(clicker, 4);
    CheatEngine.managerInterval = setInterval(manager, 500);
    CheatEngine.isRunning = true;
  }

  toggleButtonStyle(event.currentTarget, CheatEngine.isRunning);
}

function toggleButtonStyle(btn, isCheatActive) {
  if (isCheatActive) {
    btn.innerText = "✅ Stop Auto-Clicker";
    btn.style.backgroundColor = "#2e7d32";
  } else {
    btn.innerText = "❌ Start Auto-Clicker";
    btn.style.backgroundColor = "#d32f2f";
  }
}

function createButton() {
  const btn = document.createElement('button');

  btn.style.position = "fixed";
  btn.style.top = "42px";
  btn.style.left = "10px";
  btn.style.zIndex = "10000";
  btn.style.padding = "5px 10px";
  btn.style.fontSize = "12px";
  btn.style.fontWeight = "bold";
  btn.style.color = "white";
  btn.style.border = "2px solid #c37d3c";
  btn.style.borderRadius = "5px";
  btn.style.cursor = "pointer";
  btn.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";

  btn.onclick = toggleCheats;

  toggleButtonStyle(btn, CheatEngine.isRunning);

  document.body.appendChild(btn);
}

createButton();

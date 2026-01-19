var btn = document.createElement('button');
btn.innerText = "❌ Start Auto-Clicker";

btn.style.position = "fixed";
btn.style.top = "42px";
btn.style.left = "10px";
btn.style.zIndex = "10000";
btn.style.padding = "5px 10px";
btn.style.fontSize = "12px";
btn.style.fontWeight = "bold";
btn.style.color = "white";
btn.style.backgroundColor = "#d32f2f"; // Red
btn.style.border = "2px solid #c37d3c";
btn.style.borderRadius = "5px";
btn.style.cursor = "pointer";
btn.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";

const CheatEngine = {
  autoClicker: null,         // Interval for simulating big cookie clicks.
  shimmerClicker: null,      // Interval for clicking golden cookies.
  isRunning: false,
};

function toggleCheats() {
  if (CheatEngine.isRunning) {
    clearInterval(CheatEngine.autoClicker);
    clearInterval(CheatEngine.shimmerClicker);
    btn.innerText = "❌ Start Auto-Clicker";
    btn.style.backgroundColor = "#d32f2f";
    CheatEngine.isRunning = false;
  } else {
    CheatEngine.autoClicker = setInterval(() => Game.ClickCookie(), 4);
    CheatEngine.shimmerClicker = setInterval(() => document.querySelectorAll('.shimmer').forEach(x => x.click()), 500);
    btn.innerText = "✅ Stop Auto-Clicker";
    btn.style.backgroundColor = "#2e7d32";
    CheatEngine.isRunning = true;
  }
}

btn.onclick = toggleCheats;

document.body.appendChild(btn);

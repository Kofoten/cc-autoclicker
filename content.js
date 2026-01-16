const scriptElem = document.createElement('script');
scriptElem.src = chrome.runtime.getURL('injected_cheat.js');
scriptElem.onload = function() {
    this.remove();
};

(document.head || document.documentElement).appendChild(scriptElem);
function forwardSettingsUpdate(request, sender, sendResponse) {
    if (request.action === 'cc-autoclicker_updateSettings') {
        window.postMessage({
            type: 'CC_AUTOCLICKER_UPDATE_SETTINGS',
            payload: request.settings
        }, '*');
    }
}

const scriptElem = document.createElement('script');
scriptElem.src = chrome.runtime.getURL('injected_cheat.js');
scriptElem.onload = function() {
    this.remove();
};

(document.head || document.documentElement).appendChild(scriptElem);

chrome.runtime.onMessage.addListener(forwardSettingsUpdate)
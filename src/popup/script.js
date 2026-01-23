function onMessageResponse(response, statusElement) {
    if (chrome.runtime.lastError) {
        statusElement.innerText = "Game not found. Refresh?";
    } else {
        statusElement.innerText = "Settings Saved!";
        setTimeout(() => statusElement.innerText = "", 2000);
    }
}

function onTabQueryResult(tabs, settings, statusElement) {
    if (tabs.length === 0) {
        statusElement.innerText = "Error: No active tab";
        return;
    }

    const message = {
        action: 'cc-autoclicker_updateSettings',
        settings: settings
    }

    chrome.tabs.sendMessage(tabs[0].id, message, (resp) => onMessageResponse(resp, statusElement));
}

function onSubmit(event, form, statusElement) {
    event.preventDefault();

    const settings = {
        isRunning: form.elements['isRunning'].checked,
        popWrinklers: form.elements['popWrinklers'].checked,
        clickWrath: form.elements['clickWrath'].checked
    };

    statusElement.innerText = "Sending to Game...";

    chrome.storage.local.set(settings);

    const query = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(query, (tabs) => onTabQueryResult(tabs, settings, statusElement));
}

function onDOMContentLoad() {
    const form = document.getElementById('settingsForm');
    const statusElement = document.getElementById('statusMsg');

    chrome.storage.local.get({
        isRunning: false,
        popWrinklers: true,
        clickWrath: false
    }, function(items) {
        form.elements['isRunning'].checked = items.isRunning;
        form.elements['popWrinklers'].checked = items.popWrinklers;
        form.elements['clickWrath'].checked = items.clickWrath;
    });

    form.addEventListener('submit', (event) => onSubmit(event, form, statusElement));
}

document.addEventListener('DOMContentLoaded', onDOMContentLoad);
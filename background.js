// Default gesture mappings
const DEFAULT_GESTURES = {
    'L': 'back',
    'R': 'forward',
    'DR': 'newtab',
    'DL': 'closetab',
    'UD': 'reload'
};

// Load gesture settings from storage or use defaults
async function loadGestureSettings() {
    const result = await chrome.storage.sync.get('gestureSettings');
    return result.gestureSettings || DEFAULT_GESTURES;
}

// Handle gesture actions
async function handleGesture(gesture) {
    const gestureSettings = await loadGestureSettings();
    const action = gestureSettings[gesture];
    
    if (!action) return;

    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    
    switch (action) {
        case 'back':
            chrome.tabs.goBack(tab.id);
            break;
        case 'forward':
            chrome.tabs.goForward(tab.id);
            break;
        case 'reload':
            chrome.tabs.reload(tab.id);
            break;
        case 'newtab':
            chrome.tabs.create({});
            break;
        case 'closetab':
            chrome.tabs.remove(tab.id);
            break;
    }
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GESTURE_COMPLETED') {
        handleGesture(message.gesture);
    }
}); 
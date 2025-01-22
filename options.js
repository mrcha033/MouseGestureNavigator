// Available actions for gestures
const AVAILABLE_ACTIONS = [
    { value: 'back', label: 'Go Back' },
    { value: 'forward', label: 'Go Forward' },
    { value: 'reload', label: 'Reload Page' },
    { value: 'newtab', label: 'New Tab' },
    { value: 'closetab', label: 'Close Tab' }
];

// Default gesture patterns
const DEFAULT_PATTERNS = ['L', 'R', 'U', 'D', 'DR', 'DL', 'UD'];

// Load current settings
async function loadSettings() {
    const result = await chrome.storage.sync.get('gestureSettings');
    return result.gestureSettings || {
        'L': 'back',
        'R': 'forward',
        'DR': 'newtab',
        'DL': 'closetab',
        'UD': 'reload'
    };
}

// Save settings
async function saveSettings() {
    const settings = {};
    const items = document.querySelectorAll('.gesture-item');
    
    items.forEach(item => {
        const pattern = item.querySelector('.gesture-pattern').textContent;
        const action = item.querySelector('.gesture-action').value;
        if (action) {
            settings[pattern] = action;
        }
    });

    await chrome.storage.sync.set({ gestureSettings: settings });
    alert('Settings saved successfully!');
}

// Create the settings UI
function createSettingsUI(settings) {
    const container = document.getElementById('gesture-settings');
    
    DEFAULT_PATTERNS.forEach(pattern => {
        const item = document.createElement('div');
        item.className = 'gesture-item';
        
        const patternSpan = document.createElement('span');
        patternSpan.className = 'gesture-pattern';
        patternSpan.textContent = pattern;
        
        const select = document.createElement('select');
        select.className = 'gesture-action';
        
        // Add empty option
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = '-- Select Action --';
        select.appendChild(emptyOption);
        
        // Add available actions
        AVAILABLE_ACTIONS.forEach(action => {
            const option = document.createElement('option');
            option.value = action.value;
            option.textContent = action.label;
            if (settings[pattern] === action.value) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        
        item.appendChild(patternSpan);
        item.appendChild(select);
        container.appendChild(item);
    });
}

// Initialize the options page
async function init() {
    const settings = await loadSettings();
    createSettingsUI(settings);
    
    document.getElementById('save').addEventListener('click', saveSettings);
}

// Start the initialization when the page loads
document.addEventListener('DOMContentLoaded', init); 
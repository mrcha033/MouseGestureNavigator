# Mouse Gesture Navigator

Control your browser faster and more efficiently with mouse gestures! 🚀

## Why Mouse Gesture Navigator?

✨ **Save Time**: Perform browser actions with simple gestures while holding the right mouse button. No need to click toolbar buttons or memorize keyboard shortcuts.

🎯 **Intuitive Usage**: Control your browser with natural movements - swipe left to go back, right to go forward, and more.

⚡ **Boost Productivity**: Execute common browser functions quickly to significantly improve your web browsing speed.

🛠️ **Customizable**: Configure gestures and functions to control your browser in your own way.

## Key Features

### Basic Gestures
- ⬅️ Swipe Left (L) → Go Back
- ➡️ Swipe Right (R) → Go Forward
- ↘️ Down then Right (DR) → Open New Tab
- ↙️ Down then Left (DL) → Close Tab
- ↕️ Up then Down (UD) → Refresh Page

### Special Features
- 🎨 Visual feedback while drawing gestures
- ⚙️ User-configurable gesture mapping
- 🎯 Accurate gesture recognition

## Installation

1. Download or clone this repository
2. Go to `chrome://extensions/` in Chrome browser
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder

## Customization

1. Click the Mouse Gesture Navigator icon in the Chrome toolbar
2. Select "Options"
3. Map your desired gestures and functions
4. Click "Save" to store your settings

## Tech Stack

- Manifest V3
- JavaScript
- Chrome Extension APIs

## Permissions Explained

### Required Permissions

#### 🔑 "tabs"
- Access and manipulate browser tabs
- Required for:
  - Opening new tabs
  - Closing current tab
  - Getting tab information for navigation
  - Switching between tabs

#### 💾 "storage"
- Store user preferences and settings
- Required for:
  - Saving custom gesture configurations
  - Persisting user settings across browser sessions
  - Storing gesture mapping data

#### 🌐 "host_permissions"
- Access to webpage information
- Required for:
  - Capturing mouse movements on web pages
  - Executing navigation commands (back/forward)
  - Ensuring gesture recognition works across all websites

These permissions are essential for core functionality and are used only for gesture recognition and navigation purposes. We respect your privacy and do not collect any personal data.

## License

MIT License
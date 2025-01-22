# Mouse Gesture Navigator

A Chrome extension that allows you to navigate using mouse gestures. Perform actions like going back, forward, opening new tabs, and more with simple mouse movements.

## Features

- Mouse gesture navigation support
- Customizable gesture mappings
- Visual feedback while drawing gestures
- Default gestures:
  - Left (L) → Go Back
  - Right (R) → Go Forward
  - Down + Right (DR) → New Tab
  - Down + Left (DL) → Close Tab
  - Up + Down (UD) → Reload Page

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Hold the right mouse button and draw a gesture
2. Release the right mouse button to execute the action
3. A red line will show your gesture path while drawing

## Customization

1. Click the extension icon in Chrome's toolbar
2. Select "Options" from the popup menu
3. Customize gesture mappings according to your preferences
4. Click "Save" to apply changes

## Available Actions

- Go Back
- Go Forward
- Reload Page
- New Tab
- Close Tab

## Development

The extension is built using:
- Manifest V3
- JavaScript
- Chrome Extension APIs

### Project Structure

```
├── manifest.json        # Extension manifest
├── background.js       # Background service worker
├── content.js         # Content script for gesture detection
├── options.html       # Options page HTML
├── options.js        # Options page JavaScript
└── README.md         # This file
```

## License

MIT License 
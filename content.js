class GestureDetector {
    constructor() {
        this.isTracking = false;
        this.points = [];
        this.minDistance = 30; // Minimum distance to register a direction change
        this.gesture = '';
        
        this.bindEvents();
    }

    bindEvents() {
        // Prevent context menu before any mouse events
        document.addEventListener('contextmenu', this.preventDefault);
        document.addEventListener('mousedown', this.startTracking.bind(this));
        document.addEventListener('mousemove', this.track.bind(this));
        document.addEventListener('mouseup', this.endTracking.bind(this));
    }

    preventDefault(e) {
        e.preventDefault();
        return false;
    }

    startTracking(e) {
        // Only start tracking on right mouse button
        if (e.button === 2) {
            this.isTracking = true;
            this.points = [{x: e.clientX, y: e.clientY}];
            this.gesture = '';
            this.drawGesture(e.clientX, e.clientY);
            e.preventDefault(); // Prevent context menu
        }
    }

    track(e) {
        if (!this.isTracking) return;

        const lastPoint = this.points[this.points.length - 1];
        const newPoint = {x: e.clientX, y: e.clientY};
        
        if (this.getDistance(lastPoint, newPoint) > this.minDistance) {
            this.points.push(newPoint);
            this.updateGesture(lastPoint, newPoint);
            this.drawGesture(e.clientX, e.clientY);
        }
        e.preventDefault(); // Prevent any default behavior during tracking
    }

    endTracking(e) {
        if (!this.isTracking) return;
        
        this.isTracking = false;
        this.clearGestureDrawing();
        
        if (this.gesture) {
            chrome.runtime.sendMessage({
                type: 'GESTURE_COMPLETED',
                gesture: this.gesture
            });
        }
        
        if (e) {
            e.preventDefault(); // Prevent any default behavior when ending
        }
    }

    updateGesture(lastPoint, newPoint) {
        const angle = this.getAngle(lastPoint, newPoint);
        const direction = this.getDirection(angle);
        
        if (direction) {
            this.gesture += direction;
        }
    }

    getDistance(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    getAngle(point1, point2) {
        return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
    }

    getDirection(angle) {
        if (angle >= -45 && angle < 45) return 'R';  // Right
        if (angle >= 45 && angle < 135) return 'D';  // Down
        if (angle >= 135 || angle < -135) return 'L';  // Left
        if (angle >= -135 && angle < -45) return 'U';  // Up
        return null;
    }

    drawGesture(x, y) {
        let canvas = document.getElementById('gesture-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'gesture-canvas';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '9999';
            document.body.appendChild(canvas);
            
            // Set canvas size to match window size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 2;

        if (this.points.length === 1) {
            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }

    clearGestureDrawing() {
        const canvas = document.getElementById('gesture-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
}

// Initialize the gesture detector
const detector = new GestureDetector(); 
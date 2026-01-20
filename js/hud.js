/**
 * HUD.JS
 * Creates a "Scientific Research" overlay.
 * Tracking coordinates, time, and system status.
 */

class HUDSystem {
    constructor() {
        this.createOverlay();
        this.bindEvents();
        this.startTime = Date.now();
        this.animate();
    }

    createOverlay() {
        // Main HUD container
        this.hud = document.createElement('div');
        this.hud.className = 'science-hud';

        this.hud.innerHTML = `
            <!-- Top Right: Time -->
            <div class="hud-item hud-top-right">
                <div class="hud-label">LOCAL_TIME</div>
                <div id="hud-time" class="hud-value">00:00:00</div>
            </div>

            <!-- Bottom Left: status -->
            <div class="hud-item hud-bottom-left">
                <div class="status-dot"></div>
                <span class="hud-mono">SYS.MONITORING: ACTIVE</span>
            </div>

            <!-- Right Edge: Scroll Depth -->
            <div class="hud-right-edge">
                <div class="depth-marker" style="top: 20%">- 200m</div>
                <div class="depth-marker" style="top: 50%">- 500m</div>
                <div class="depth-marker" style="top: 80%">- 800m</div>
                <div id="depth-indicator" class="depth-indicator"></div>
            </div>
            
            <!-- Grid Lines (Overlay) -->
            <div class="hud-grid"></div>
        `;

        document.body.appendChild(this.hud);
    }

    bindEvents() {
        // Scroll Tracking
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            const indicator = document.getElementById('depth-indicator');
            if (indicator) indicator.style.top = `${scrollPercent}%`;
        });
    }

    animate() {
        // Time Update
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
        const timeEl = document.getElementById('hud-time');
        if (timeEl) timeEl.innerText = timeStr + `.${Math.floor(Date.now() % 1000)}`;

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Only init if screen is big enough (desktop scientific feel)
    if (window.innerWidth > 768) {
        new HUDSystem();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Select essential DOM elements
    const phoneScreen = document.getElementById('phone-screen');
    const splashLayer = document.getElementById('splash-layer');
    const statusTime = document.getElementById('status-time');
    const btnReplay = document.getElementById('btn-replay');
    const btnToggleScreen = document.getElementById('btn-toggle-screen');

    // State Variables
    let transitionTimer = null;
    let holdOnSplash = false;

    // 1. Dynamic Time Updater for iOS Status Bar
    function updateStatusBarTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        // Format with leading zeroes
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        statusTime.textContent = `${hours}:${minutes}`;
    }
    
    // Initial update and periodic interval update
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 10000);

    // 2. Splash Transition Manager
    function startSplashTimer() {
        // Clear any active timer first
        if (transitionTimer) {
            clearTimeout(transitionTimer);
        }

        // The splash transitions after 2.5 seconds (1.5 seconds visible + 1s of animation setup)
        transitionTimer = setTimeout(() => {
            if (!holdOnSplash) {
                transitionToDashboard();
            }
        }, 2500);
    }

    function transitionToDashboard() {
        splashLayer.classList.add('fade-out');
        phoneScreen.classList.add('app-loaded');
    }

    function resetToSplash() {
        // Clear active timer
        if (transitionTimer) {
            clearTimeout(transitionTimer);
        }

        // Reset classes
        splashLayer.classList.remove('fade-out');
        phoneScreen.classList.remove('app-loaded');

        // Force a DOM reflow to re-trigger CSS animations
        // This is a common and reliable technique for resetting keyframe animations
        void splashLayer.offsetWidth;

        // Restart timer unless hold is active
        startSplashTimer();
    }

    // 3. Button Click Listeners
    
    // Replay Button
    btnReplay.addEventListener('click', () => {
        resetToSplash();
    });

    // Hold / Pause Transition Button
    btnToggleScreen.addEventListener('click', () => {
        holdOnSplash = !holdOnSplash;
        
        if (holdOnSplash) {
            // Cancel transition if it's currently scheduled
            if (transitionTimer) {
                clearTimeout(transitionTimer);
            }
            
            // Bring splash screen back if it has already transitioned
            splashLayer.classList.remove('fade-out');
            phoneScreen.classList.remove('app-loaded');
            
            // Update button styles/text for visual feedback
            btnToggleScreen.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Resume Autoplay
            `;
            btnToggleScreen.classList.add('active');
        } else {
            // Re-enable autoplay and transition
            btnToggleScreen.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                Hold on Splash
            `;
            btnToggleScreen.classList.remove('active');
            
            // Trigger transition immediately
            transitionToDashboard();
        }
    });

    // 4. Initial Start
    startSplashTimer();
});

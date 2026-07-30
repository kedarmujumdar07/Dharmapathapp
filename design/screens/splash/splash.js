document.addEventListener('DOMContentLoaded', () => {
    // DOM Selection
    const statusTime = document.getElementById('status-time');
    
    // View Selectors
    const btnShowStatic = document.getElementById('btn-show-static');
    const btnShowLoader = document.getElementById('btn-show-loader');
    
    // Action Containers
    const loaderActions = document.getElementById('loader-actions');
    const btnReplayLoader = document.getElementById('btn-replay-loader');
    
    // Screen Elements
    const staticSplash = document.getElementById('static-splash');
    const inAppLoader = document.getElementById('in-app-loader');

    // 1. Dynamic Time Updater for iOS Status Bar
    function updateStatusBarTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        statusTime.textContent = `${hours}:${minutes}`;
    }
    
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 10000);

    // 2. View Switcher Logic
    
    function showStaticSplashView() {
        // Toggle Buttons
        btnShowStatic.classList.add('active');
        btnShowLoader.classList.remove('active');
        
        // Toggle Screens
        staticSplash.classList.add('active');
        inAppLoader.classList.remove('active');
        
        // Hide Loader Actions
        loaderActions.style.display = 'none';
    }

    function showInAppLoaderView() {
        // Toggle Buttons
        btnShowLoader.classList.add('active');
        btnShowStatic.classList.remove('active');
        
        // Toggle Screens
        inAppLoader.classList.add('active');
        staticSplash.classList.remove('active');
        
        // Show Loader Actions
        loaderActions.style.display = 'block';

        // Re-trigger animations
        triggerLoaderAnimations();
    }

    function triggerLoaderAnimations() {
        // Force a DOM reflow to restart CSS animations on the loader screen
        inAppLoader.classList.remove('active');
        void inAppLoader.offsetWidth; // Reflow trigger
        inAppLoader.classList.add('active');
    }

    // Event Listeners for switching views
    btnShowStatic.addEventListener('click', showStaticSplashView);
    btnShowLoader.addEventListener('click', showInAppLoaderView);

    // Replay Loader Animation
    btnReplayLoader.addEventListener('click', () => {
        triggerLoaderAnimations();
    });

    // Default Initialization (Start on Static Splash)
    showStaticSplashView();
});

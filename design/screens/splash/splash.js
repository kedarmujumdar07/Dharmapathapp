document.addEventListener('DOMContentLoaded', () => {
    // DOM Selection
    const statusTime = document.getElementById('status-time');
    const statusTimeLoader = document.getElementById('status-time-loader');

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
        
        const timeStr = `${hours}:${minutes}`;
        if (statusTime) statusTime.textContent = timeStr;
        if (statusTimeLoader) statusTimeLoader.textContent = timeStr;
    }
    
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 10000);

    // 2. Auto-sequence: Static Splash → Loader after 2.5 seconds
    function showStaticSplashView() {
        staticSplash.classList.add('active');
        inAppLoader.classList.remove('active');
    }

    function showInAppLoaderView() {
        inAppLoader.classList.add('active');
        staticSplash.classList.remove('active');
    }

    // Start on static splash
    showStaticSplashView();

    // After 2.5 seconds, transition to the loader state
    setTimeout(() => {
        showInAppLoaderView();
    }, 2500);
});

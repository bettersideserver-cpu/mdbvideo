const playBtn = document.getElementById('playWalkthroughBtn');
const overlay = document.getElementById('videoOverlay');
const video = document.getElementById('walkthroughVideo');

// Cross-browser fullscreen helpers
function enterFullscreen(el) {
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
}

function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
}

// Open overlay and play video fullscreen
if (playBtn) {
    playBtn.addEventListener('click', () => {
        overlay.style.display = 'flex';
        requestAnimationFrame(() => overlay.classList.add('active'));
        video.play();
        enterFullscreen(video);
    });
}

// When video ends → exit fullscreen & close overlay
video.addEventListener('ended', () => {
    video.pause();
    video.currentTime = 0;
    exitFullscreen();
    overlay.classList.remove('active');
    setTimeout(() => (overlay.style.display = 'none'), 400);
});

// 🟢 Detect if fullscreen is exited manually
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        // If fullscreen is closed while video is playing
        if (!video.paused) {
            video.pause();
        }
        overlay.classList.remove('active');
        setTimeout(() => (overlay.style.display = 'none'), 400);
    }
});

// Click outside video to close early
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        video.pause();
        exitFullscreen();
        overlay.classList.remove('active');
        setTimeout(() => (overlay.style.display = 'none'), 400);
    }
});
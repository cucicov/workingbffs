// -------- dynamic backgrounds

const hoverDiv = document.getElementById('jurnal');

// Function to apply hover behavior only on desktop (larger than 768px)
function handleHoverBehavior() {
  if (window.innerWidth >= 768) {
    // Apply hover behavior for desktop
    hoverDiv.addEventListener('mouseenter', addHoverClass);
    hoverDiv.addEventListener('mouseleave', removeHoverClass);
  } else {
    // On mobile, always apply the class
    hoverDiv.classList.add('rainbow-background');
    // Remove hover event listeners for mobile
    hoverDiv.removeEventListener('mouseenter', addHoverClass);
    hoverDiv.removeEventListener('mouseleave', removeHoverClass);
  }
}

// Functions to add and remove class
function addHoverClass() {
  hoverDiv.classList.add('rainbow-background');
}

function removeHoverClass() {
  hoverDiv.classList.remove('rainbow-background');
}

// Run on page load
handleHoverBehavior();

// Run on window resize to recheck device width
window.addEventListener('resize', handleHoverBehavior);


// ------ VIDEO play fullscreen
// Get elements
const openVideoButtons = document.querySelectorAll('.openVideo');
// const videoModal = document.getElementById('videoModal');
// const desktopVideo = videoModal.querySelector('.desktopVideo');
// const closeModalButton = videoModal.querySelector('.closeModal');

let mobileVideoElement = null; // Declare a global variable to store the video element for mobile

// Check screen width to differentiate between mobile and desktop
function isMobile() {
  return window.innerWidth <= 768;
}

// Check if it's an iOS device
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Handle exiting full-screen on Android/desktop
function onFullScreenChange() {
  if (!document.fullscreenElement && isMobile() && mobileVideoElement) {
    mobileVideoElement.pause(); // Stop the video
    document.body.removeChild(mobileVideoElement); // Remove the video element
    mobileVideoElement = null; // Reset the variable
  }
}

// Handle exiting full-screen on iOS using `webkitendfullscreen`
function onIOSFullScreenExit() {
  if (isIOS() && mobileVideoElement) {
    mobileVideoElement.pause(); // Stop the video
    document.body.removeChild(mobileVideoElement); // Remove the video element
    mobileVideoElement = null; // Reset the variable
  }
}

// Open video pop-up or full-screen based on device type
openVideoButtons.forEach(function(element) {

  // Traverse to the next sibling and check for the desktopVideo and CloseModal class.

  let videoModal = element.nextElementSibling;

  while (videoModal && !videoModal.classList.contains('videoModal')) {
    videoModal = videoModal.nextElementSibling;
  }

  let closeModalButton;
  let desktopVideo;
  if(videoModal) {
    console.log('one desktopVideo found');
    closeModalButton = videoModal.querySelector('.closeModal');
    desktopVideo = videoModal.querySelector('.desktopVideo');
  }

  if (closeModalButton) {
    console.log('one closeModal found')
  }
  if (desktopVideo) {
    console.log('one desktopVideo found')
  }

// Get the source element inside the modal
  const videoSource = desktopVideo.querySelector('source');

  element.addEventListener('click', function () {
    if (isMobile()) {
      // Mobile behavior: Open video in full-screen
      mobileVideoElement = document.createElement('video');

      // Get video src from the source element in the desktop modal
      mobileVideoElement.src = videoSource.src;

      mobileVideoElement.controls = true;
      mobileVideoElement.style.position = 'fixed';
      mobileVideoElement.style.top = '0';
      mobileVideoElement.style.left = '0';
      mobileVideoElement.style.width = '100vw';
      mobileVideoElement.style.height = '100vh';
      mobileVideoElement.style.zIndex = '100';

      // Add video element to the body
      document.body.appendChild(mobileVideoElement);

      // Automatically play the video
      mobileVideoElement.play();

      if (!isIOS()) {
        // Request full-screen mode for Android and desktop
        mobileVideoElement.requestFullscreen().catch(err => {
          console.error("Failed to open full-screen:", err);
        });

        // Listen for full-screen change events on Android/desktop
        document.addEventListener('fullscreenchange', onFullScreenChange);
      } else {
        // For iOS, listen to the `webkitendfullscreen` event
        mobileVideoElement.addEventListener('webkitendfullscreen', onIOSFullScreenExit);
      }

      // Optionally remove video when playback ends
      mobileVideoElement.addEventListener('ended', function () {
        document.body.removeChild(mobileVideoElement);
        mobileVideoElement = null; // Reset the variable after removal
      });
    } else {
      // Desktop behavior: Show video in a modal pop-up
      videoModal.classList.add('active');
      desktopVideo.play();
    }
  });

  // Close modal on desktop
  closeModalButton.addEventListener('click', function () {
    if (isMobile() && mobileVideoElement) {
      // Remove video from mobile if it's still in DOM
      document.body.removeChild(mobileVideoElement);
      mobileVideoElement = null; // Reset the variable after removal
    } else {
      // Close modal on desktop
      videoModal.classList.remove('active');
      desktopVideo.pause();
    }
  });
});





export default function getSwipeDirection () {
  
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  
  // Minimum distance required for a swipe gesture
  const minDistance = 50;

  const carousel = document.body;

  // console.log(carousel);

  carousel.addEventListener('touchstart', function(event) {
    // Store the starting touch position
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  });
  
  carousel.addEventListener('touchend', function(event) {
    // Store the ending touch position
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;
  
    // Calculate the distance in both X and Y axes
    const deltaX = endX - startX;
    const deltaY = endY - startY;
  
    // Check if the distance is greater than the minimum required
    if (Math.abs(deltaX) > minDistance || Math.abs(deltaY) > minDistance) {
      // Determine the direction of the swipe
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe (left or right)
        if (deltaX > 0) {
          // Right swipe
          // console.log('Right swipe');
          return 'right';
        } else {
          // Left swipe
          // console.log('Left swipe');
          return 'left';
        }
      } else {
        // Vertical swipe (up or down)
        if (deltaY > 0) {
          // Down swipe
          // console.log('Down swipe');
          return 'down';
        } else {
          // Up swipe
          // console.log('Up swipe');
          return 'up';
        }
      }
    }
  });
}
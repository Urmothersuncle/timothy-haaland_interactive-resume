function adjustLayoutForMobile() {
    const profilePhoto = document.getElementById('profilePhoto');
    const gameContainer = document.getElementById('gameContainer');
    const photoContainer = document.getElementById('photoContainer');
    const leftSide = document.querySelector('.left-side');
    const rightSide = document.querySelector('.right-side');

    if (window.innerWidth <= 768) {
      if (!photoContainer.contains(profilePhoto)) {
        photoContainer.appendChild(profilePhoto);
      }

      if (!rightSide.contains(gameContainer)) {
        rightSide.appendChild(gameContainer);
      }
    } else {
      if (!rightSide.contains(profilePhoto)) {
        rightSide.appendChild(profilePhoto); 
      }

      if (!leftSide.contains(gameContainer)) {
        leftSide.appendChild(gameContainer); 
      }
    }
  }

  adjustLayoutForMobile();
  window.addEventListener('resize', adjustLayoutForMobile);

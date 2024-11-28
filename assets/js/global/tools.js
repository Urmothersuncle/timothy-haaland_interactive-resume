document.addEventListener('DOMContentLoaded', function() {
  const toolButton = document.getElementById('toolButton');
  const toolModal = document.getElementById('toolModal');

  // Open modal on button click
  toolButton.addEventListener('click', function() {
      toolModal.style.display = 'block';
  });

  // Close modal when clicking the close button
  const closeModalButton = document.getElementById('closeToolModal');
  closeModalButton.addEventListener('click', function() {
      toolModal.style.display = 'none';
  });

  // Close modal when clicking outside the modal content
  window.onclick = function(event) {
      if (event.target === toolModal) {
          toolModal.style.display = 'none';
      }
  };
});

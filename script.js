document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.toggle-btn');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
});
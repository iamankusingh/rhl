document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle');
  
  // Create an overlay for mobile
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-ink-900/20 backdrop-blur-sm z-40 hidden lg:hidden transition-opacity opacity-0';
  document.body.appendChild(overlay);

  if (sidebar && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        // Mobile toggle
        const isOpen = sidebar.classList.toggle('mobile-open');
        
        // Handle overlay
        if (isOpen) {
          overlay.classList.remove('hidden');
          // small delay for transition
          setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        } else {
          overlay.classList.add('opacity-0');
          setTimeout(() => overlay.classList.add('hidden'), 300);
        }
      } else {
        // Desktop toggle
        sidebar.classList.toggle('collapsed');
      }
    });

    // Close sidebar on overlay click
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.classList.add('opacity-0');
      setTimeout(() => overlay.classList.add('hidden'), 300);
    });

    // Clean up classes on window resize to prevent visual bugs
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        // If resized to desktop, ensure off-canvas is closed
        sidebar.classList.remove('mobile-open');
        overlay.classList.add('hidden');
        overlay.classList.add('opacity-0');
      } else {
        // If resized to mobile, ensure desktop collapsed state is reset
        sidebar.classList.remove('collapsed');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Find links containing email-protected
  var socialLinks = document.querySelectorAll('a[href*="email-protected"]');

  socialLinks.forEach(function(link) {
    // 1. Clear English tooltip
    link.setAttribute('title', 'Click to copy email');
    
    // Ensure it looks clickable
    link.style.cursor = 'pointer';

    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      // 2. EMAIL OBFUSCATION
      // "c****a.g******a@gmail.com" encoded in Base64.
      var encodedEmail = 'Y2FtYXJjYS5naWFubHVjYUBnbWFpbC5jb20=';
      var email = atob(encodedEmail);

      // Copy to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function() {
          
          // 3. CLEAR FEEDBACK (ALERT)
          // English text, no icons.
          alert('Email copied to clipboard:\n\n' + email + '\n\nYou can now paste it anywhere.');

          // Optional visual feedback on the link
          link.classList.add('email-copied');
          link.setAttribute('title', 'Email copied!');
          setTimeout(function() {
            link.classList.remove('email-copied');
            link.setAttribute('title', 'Click to copy email');
          }, 2000);

        }).catch(function(err) {
          // Fallback
          prompt('Manual copy required:', email);
        });
      } else {
        // Fallback for older browsers
        prompt('Manual copy required:', email);
      }

      return false;
    }, true);
  });
});
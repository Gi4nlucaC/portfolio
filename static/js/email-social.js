document.addEventListener('DOMContentLoaded', function() {
  console.log('Email script loaded');
  
  // Cerca link che contengono #email-protected (anche con baseURL)
  var socialLinks = document.querySelectorAll('a[href*="email-protected"]');
  console.log('Found links:', socialLinks.length);
  
  socialLinks.forEach(function(link) {
    console.log('Setting up email link:', link.href);
    
    link.addEventListener('click', function(e) {
      console.log('Email link clicked');
      e.preventDefault();
      e.stopPropagation();
      
      var email = 'camarca.gianluca@gmail.com';
      
      // Prova a copiare negli appunti
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function() {
          console.log('Email copied:', email);
          alert('Email copied to clipboard: ' + email);
        }).catch(function(err) {
          console.error('Clipboard failed:', err);
          prompt('Copy this email:', email);
        });
      } else {
        // Fallback per browser che non supportano clipboard API
        console.log('Clipboard API not available, using prompt');
        prompt('Copy this email:', email);
      }
      
      return false;
    }, true);
  });
});

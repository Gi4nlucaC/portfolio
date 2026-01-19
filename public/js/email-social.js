document.addEventListener('DOMContentLoaded', function() {
  // Cerca link che contengono email-protected (anche con baseURL)
  var socialLinks = document.querySelectorAll('a[href*="email-protected"], a.email-copy-link');
  
  socialLinks.forEach(function(link) {
    link.setAttribute('title', 'Copia la mail negli appunti');
    
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      var email = 'camarca.gianluca@gmail.com';
      
      // Copia negli appunti
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function() {
          alert('Email copiata negli appunti!');
        }).catch(function(err) {
          // Fallback: prompt per copiare manualmente
          prompt('Copia questa email:', email);
        });
      } else {
        // Fallback per browser senza clipboard API
        prompt('Copy this email:', email);
      }
      
      return false;
    }, true);
  });
});

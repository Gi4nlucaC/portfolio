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
          // Feedback visivo: aggiungi classe CSS
          link.classList.add('email-copied');
          link.setAttribute('title', '\u2713 Copiata!');
          // Cambia testo label se presente
          var label = link.querySelector('.email-copy-label');
          if(label) label.textContent = 'Copiata!';
          setTimeout(function() {
            link.classList.remove('email-copied');
            link.setAttribute('title', 'Copia la mail negli appunti');
            if(label) label.textContent = 'Copy Email';
          }, 2000);
        }).catch(function(err) {
          // Fallback: prompt per copiare manualmente
          prompt('Copy this email:', email);
        });
      } else {
        // Fallback per browser senza clipboard API
        prompt('Copy this email:', email);
      }
      
      return false;
    }, true);
  });
});

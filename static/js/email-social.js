document.addEventListener('DOMContentLoaded', function() {
  // Cerca link che contengono email-protected (anche con baseURL)
  var socialLinks = document.querySelectorAll('a[href*="email-protected"]');
  
  socialLinks.forEach(function(link) {
    link.setAttribute('title', 'Click to copy email');
    
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      var email = 'camarca.gianluca@gmail.com';
      
      // Copia negli appunti
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function() {
          // Feedback visivo: cambio colore e tooltip
          var originalColor = link.style.color;
          link.style.color = '#4CAF50';
          link.setAttribute('title', '✓ Email copied!');
          
          setTimeout(function() {
            link.style.color = originalColor;
            link.setAttribute('title', 'Click to copy email');
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

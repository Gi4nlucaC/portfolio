document.addEventListener('DOMContentLoaded', function() {
  // Cerca link che contengono #email-protected (anche con baseURL)
  var socialLinks = document.querySelectorAll('a[href*="#email-protected"]');
  
  socialLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var user = 'camarca.gianluca';
      var domain = 'gmail.com';
      var email = user + '@' + domain;
      
      // Copia la mail negli appunti
      navigator.clipboard.writeText(email).then(function() {
        // Mostra feedback visivo
        var originalTitle = link.getAttribute('title');
        link.setAttribute('title', '✓ Email copied: ' + email);
        
        // Cambia temporaneamente lo stile per feedback
        var originalColor = link.style.color;
        link.style.color = '#4CAF50';
        
        setTimeout(function() {
          link.setAttribute('title', 'Click to copy email');
          link.style.color = originalColor;
        }, 2000);
      }).catch(function(err) {
        // Fallback: mostra la mail in un alert se clipboard non funziona
        alert('Email: ' + email);
      });
      
      return false;
    }, true);
    link.setAttribute('title', 'Click to copy email');
  });
});

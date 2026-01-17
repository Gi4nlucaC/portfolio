document.addEventListener('DOMContentLoaded', function() {
  var socialLinks = document.querySelectorAll('a[href="#email-protected"]');
  socialLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var user = 'camarca.gianluca';
      var domain = 'gmail.com';
      var email = user + '@' + domain;
      // Rimuovi target per evitare nuova scheda
      link.removeAttribute('target');
      window.location.href = 'mailto:' + email;
      link.setAttribute('title', email);
      setTimeout(function() {
        link.setAttribute('title', 'Click to reveal email');
      }, 2000);
      return false;
    }, true);
    link.setAttribute('title', 'Click to reveal email');
  });
});

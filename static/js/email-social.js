document.addEventListener('DOMContentLoaded', function() {
  var socialLinks = document.querySelectorAll('a[href="#email-protected"]');
  socialLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var user = 'camarca.gianluca';
      var domain = 'gmail.com';
      var email = user + '@' + domain;
      // Forza il mailto anche se clicchi su svg o span
      window.location.href = 'mailto:' + email;
      // Mostra tooltip temporaneo con la mail
      link.setAttribute('title', email);
      setTimeout(function() {
        link.setAttribute('title', 'Click to reveal email');
      }, 2000);
    }, false);
    link.setAttribute('title', 'Click to reveal email');
  });
});

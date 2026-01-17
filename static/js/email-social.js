document.addEventListener('DOMContentLoaded', function() {
  var socialLinks = document.querySelectorAll('a[href="#email-protected"]');
  socialLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var user = 'camarca.gianluca';
      var domain = 'gmail.com';
      var email = user + '@' + domain;
      window.location.href = 'mailto:' + email;
    });
    link.setAttribute('title', 'Click to reveal email');
  });
});

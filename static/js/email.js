document.addEventListener('DOMContentLoaded', function() {
  var user = 'camarca.gianluca';
  var domain = 'gmail.com';
  var email = user + '@' + domain;
  var link = document.createElement('a');
  link.href = 'mailto:' + email;
  link.textContent = email;
  link.setAttribute('class', 'footer-email-link');
  var container = document.getElementById('footer-email');
  if (container) container.appendChild(link);
});

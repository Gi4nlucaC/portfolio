document.addEventListener('DOMContentLoaded', function() {
  // Cerca link che contengono email-protected
  var socialLinks = document.querySelectorAll('a[href*="email-protected"]');

  socialLinks.forEach(function(link) {
    // 1. Rendiamo il tooltip iniziale molto esplicito
    link.setAttribute('title', 'Clicca per copiare la mail');
    
    // Aggiungiamo uno stile cursore per far capire che è cliccabile
    link.style.cursor = 'pointer';

    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      // 2. OFFUSCAMENTO DELLA MAIL
      // La stringa sotto è "camarca.gianluca@gmail.com" codificata in Base64.
      // In questo modo non appare in chiaro nel codice sorgente.
      var encodedEmail = 'Y2FtYXJjYS5naWFubHVjYUBnbWFpbC5jb20=';
      var email = atob(encodedEmail);

      // Copia negli appunti
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function() {
          
          // 3. FEEDBACK CHIARO E UNIVOCO (ALERT)
          // L'alert blocca l'interfaccia finché l'utente non preme OK.
          alert('✅ Email copiata negli appunti:\n\n' + email + '\n\nOra puoi incollarla dove preferisci.');

          // Feedback visivo secondario (opzionale, ma carino)
          link.classList.add('email-copied');
          link.setAttribute('title', 'Email copiata!');
          setTimeout(function() {
            link.classList.remove('email-copied');
            link.setAttribute('title', 'Clicca per copiare la mail');
          }, 2000);

        }).catch(function(err) {
          // Fallback in caso di errore
          prompt('Impossibile copiare automaticamente. Copia la mail da qui:', email);
        });
      } else {
        // Fallback per browser vecchi
        prompt('Copia la mail da qui:', email);
      }

      return false;
    }, true);
  });
});
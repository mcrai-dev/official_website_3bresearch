document.getElementById('accept-cookies').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
    startTracking();
  });

  document.getElementById('decline-cookies').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'false');
    document.getElementById('cookie-banner').style.display = 'none';
  });

  document.getElementById('customize-cookies').addEventListener('click', () => {
    // Afficher une interface modale pour la personnalisation
    alert("Interface de personnalisation en cours de développement.");
  });

  if (localStorage.getItem('cookiesAccepted') === 'true') {
    startTracking();
  } else if (localStorage.getItem('cookiesAccepted') === 'false') {
    document.getElementById('cookie-banner').style.display = 'none';
  }

  function startTracking() {
    console.log("Tracking activé.");
  }
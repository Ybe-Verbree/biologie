// Functie om de gebruikers-ID op te halen uit de URL
function getUserID() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('user_id');
}

const userId = getUserID();
console.log(`Gebruikers-ID: ${userID}`);


// Functie om naar index.html te navigeren
function pageIndex() {
  const url = new URL(window.location.href);
  url.searchParams.set('user_id', userID);
  window.location.href = "/";
}

// Functie om naar informatie.html te navigeren
function pageInfo() {
  const url = new URL(window.location.href);
  url.searchParams.set('user_id', userID);
  window.location.href = `/informatie?${url.searchParams.toString()}`;
}

// Functie om naar vragen.html te navigeren
function pageVragen() {
  const url = new URL(window.location.href);
  url.searchParams.set('user_id', userID);
  window.location.href = `/vragen?${url.searchParams.toString()}`;
}

// Event listeners voor knoppen
document.addEventListener("DOMContentLoaded", function () {
    var buttonPageIndex = document.getElementById("buttonPageIndex");
    var buttonPageInfo = document.getElementById("buttonPageInfo");
    var buttonPageVragen = document.getElementById("buttonPageVragen");


    if (buttonPageIndex) {
        buttonPageIndex.addEventListener("click", pageIndex);
    }

    if (buttonPageInfo) {
        buttonPageInfo.addEventListener("click", pageInfo);
    }

    if (buttonPageVragen) {
        buttonPageVragen.addEventListener("click", pageVragen);
    }

});

document.addEventListener('DOMContentLoaded', function() {
    const informatieForm = document.getElementById('informatie-form');
    informatieForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Voorkom dat de pagina wordt herladen

        const formData = new FormData(informatieForm);
        fetch('/opslaan', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Navigeer naar de vragenpagina met de gebruikers-ID
                window.location.href = `/vragen?user_id=${data.user_id}`;
            } else {
                console.error('Er is een fout opgetreden bij het opslaan van de gegevens.');
            }
        })
        .catch(error => {
            console.error('Er is een fout opgetreden:', error);
        });
    });
});
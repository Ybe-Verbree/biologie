function getUserID() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('user_id');
}

const userId = getUserID();
console.log(`Gebruikers-ID: ${userId}`);

let huidigeSom = 0;
let aantalHerhalingen = 5;
const gebruikteKleuren = new Set();
let aantalFouten = 0;
let tijden = [];
let reactiesnelheidSpel = 0;  // Optionele waarde

function pagebedankt() {
  const url = new URL(window.location.href);
  window.location.href = "/bedankt";
}

document.addEventListener('DOMContentLoaded', function() {
    const introTekst = document.getElementById('intro-tekst');
    const startKnop = document.getElementById('start-knop');
    const vragenlijst = document.getElementById('vragenlijst');

    startKnop.addEventListener('click', function() {
        introTekst.classList.add('hidden');
        vragenlijst.classList.remove('hidden');
        startNieuweRonde();
    });
});

function startNieuweRonde() {
    if (aantalHerhalingen > 0) {
        const gemiddeldeTijd = berekenGemiddeldeTijd();
        opslaanVragen(userId, document.body.style.backgroundColor, gemiddeldeTijd, aantalFouten, reactiesnelheidSpel);
        aantalHerhalingen--;
        let kleur;
        do {
            kleur = kiesWillekeurigeKleur(achtergrondKleuren);
        } while (gebruikteKleuren.has(kleur));
        gebruikteKleuren.add(kleur);
        document.body.style.backgroundColor = kleur;

        huidigeSom = 0;
        aantalFouten = 0;
        tijden = [];

        const willekeurigeVragen = kiesWillekeurigeVragen(vragen, 3);
        if (willekeurigeVragen.length > 0) {
            toonVraag(willekeurigeVragen[huidigeSom]);
        } else {
            console.error("Er zijn geen vragen beschikbaar.");
        }
    } else {
        // Vragenlijst is voltooid
        const gemiddeldeTijd = berekenGemiddeldeTijd();
        opslaanVragen(userId, document.body.style.backgroundColor, gemiddeldeTijd, aantalFouten, reactiesnelheidSpel);
        // Hier kun je de gebruiker doorsturen naar de volgende pagina
        pagebedankt();
    }
}

function toonVraag(vraag) {
    const rekensomTekst = document.getElementById('rekensom-tekst');
    const antwoordenContainer = document.getElementById('antwoorden-container');

    rekensomTekst.textContent = vraag.vraag;
    antwoordenContainer.innerHTML = '';

    const startTijd = new Date().getTime();

    vraag.antwoorden.forEach((antwoord, index) => {
        const antwoordElement = document.createElement('button');
        antwoordElement.textContent = antwoord;
        antwoordElement.addEventListener('click', () => {
            const eindTijd = new Date().getTime(); // Registreer de eindtijd
            const tijdVoorAntwoord = eindTijd - startTijd; // Bereken het tijdsverschil
            tijden.push(tijdVoorAntwoord); // Sla de tijd op in de array
            controleerAntwoord(index, vraag.correct);
        });
        antwoordenContainer.appendChild(antwoordElement);
    });
}

function controleerAntwoord(gekozenAntwoord, correctAntwoord) {
    const feedback = document.getElementById('feedback');
    
    if (gekozenAntwoord === correctAntwoord) {
        feedback.textContent = 'Goed gedaan!';
        huidigeSom++;
        if (huidigeSom < 3) {
            const willekeurigeVragen = kiesWillekeurigeVragen(vragen, 3);
            toonVraag(willekeurigeVragen[huidigeSom]);
        } else {
            startNieuweRonde();
        }
    } else {
        feedback.textContent = 'Helaas, dat was niet het juiste antwoord.';
        aantalFouten++;
    }
}

function kiesWillekeurigeKleur(kleuren) {
    return kleuren[Math.floor(Math.random() * kleuren.length)];
}

function kiesWillekeurigeVragen(vragen, aantal) {
    if (vragen.length === 0) {
        return [];
    }

    const willekeurigeVragen = [];
    const geselecteerdeVragen = new Set();

    while (willekeurigeVragen.length < aantal) {
        const willekeurigeIndex = Math.floor(Math.random() * vragen.length);
        if (!geselecteerdeVragen.has(willekeurigeIndex)) {
            willekeurigeVragen.push(vragen[willekeurigeIndex]);
            geselecteerdeVragen.add(willekeurigeIndex);
        }
    }

    return willekeurigeVragen;
}

function opslaanVragen(userID, achtergrondKleur, gemiddeldeTijd, aantalFouten, reactiesnelheidSpel) {
    const data = {
        user_id: userID,
        achtergrond_kleur: achtergrondKleur,
        gemiddelde_tijd: gemiddeldeTijd.toString(),
        aantal_fouten: aantalFouten.toString(),
        reactiesnelheid_spel: reactiesnelheidSpel.toString()
    };

    fetch('/opslaan_vragen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Gegevens opgeslagen');
        } else {
            console.error('Fout bij opslaan:', data.error);
        }
    })
    .catch(error => {
        console.error('Er is een fout opgetreden:', error);
    });
}

function berekenGemiddeldeTijd() {
    if (tijden.length === 0) {
        return 0; // Geen tijden beschikbaar
    }

    const totaalTijd = tijden.reduce((a, b) => a + b, 0);
    const gemiddeldeTijd = totaalTijd / tijden.length;
    return gemiddeldeTijd;
}
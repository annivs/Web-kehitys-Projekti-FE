function analyzeWellbeing() {
  const metricType = document.getElementById("metric").value;
  const value = parseFloat(document.getElementById("metricValue").value);
  const resultDiv = document.getElementById("wellbeingResult");

  if (isNaN(value) || value <= 0) {
    resultDiv.innerHTML = "Anna kelvollinen arvo!";
    return;
  }

  let feedback = "";
  let color = "black";

  if (metricType === "sleep") {
    if (value >= 7 && value <= 9) {
      feedback = "Hyvin nukuttu! Riittävä uni tukee palautumista.";
    } else if (value < 7) {
      feedback = "Voi ei! Toivottavasti saat paremmin unta ensi yönä. Voit kokeilla myös <a href='https://www.mielenterveystalo.fi/fi/omahoito/nuorten-univaikeuksien-omahoito-ohjelma/5-nopeat-apukeinot' target='_blank'>Nopeita nukahtamiskeinoja</a>.";
    } else {
      feedback = "Uni on tärkeää, mutta liian pitkä nukkuminen voi häiritä unirytmiä.";
    }
  }

  if (metricType === "activity") {
    if (value >= 30) {
      feedback = "Loistavaa! Päivittäinen liikunta tukee hyvinvointia.";
    } else {
      feedback = "Päivän aktiivisuus jäi vähäiseksi.";
    }
  }

  if (metricType === "mood") {
    if (value >= 7) {
      feedback = "Mahtavaa! Jatka samaan malliin.";
    } else if (value >= 4) {
      feedback = "Mielialasi on OK, auttaisiko oloon esim. ulkoilu tai ystävälle soittaminen? Voit kokeilla myös <a href='https://www.mielenterveystalo.fi/fi/omahoito/nuorten-ahdistuksen-omahoito-ohjelma/6-hengitysharjoitukset' target='_blank'>Hengitysharjoituksia</a>.";
    } else {
      feedback = "Tuntuuko olo matalalta? Muista pitää itsestäsi huolta. Voit kokeilla myös <a href='https://www.mielenterveystalo.fi/fi/omahoito/nuorten-ahdistuksen-omahoito-ohjelma/9-voimakkaasta-ahdistuksesta-selviaminen' target='_blank'>Huolisurffausta</a>.";
      
    }
  }

  resultDiv.innerHTML = feedback;
}
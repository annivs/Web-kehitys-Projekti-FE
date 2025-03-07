import { fetchData } from "./fetch.js";

const getEntries = async () => {

  // haetaan alue joho luodaan kortit
  const diaryContainer = document.getElementById('diary');
  console.log(diaryContainer);

  const token = localStorage.getItem('token');
  
  // Jos token ei ole saatavilla, ei voida tehdä pyyntöä
  if (!token) {
    console.log('Ei ole kirjautuneita käyttäjiä');
    return;
  }

  const url = 'http://localhost:3000/api/entries';
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  const response = await fetchData(url, options);

  if (response.error) {
    console.log('Tapahtui virhe fetch haussa!!');
    return;
  }

  console.log(response);

// Luodaan yksittäisiä kortteja käyttäjän merkinnöille

  diaryContainer.innerHTML = '';
  response.forEach((entry) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardImg = document.createElement('div');
    cardImg.classList.add('card-img');

    const img = document.createElement('img');
    img.src = '/public/img/diary.jpg';
    img.alt = 'Diary Image';
    cardImg.appendChild(img);

    const cardDiary = document.createElement('div');
    cardDiary.classList.add('card-diary');
    cardDiary.innerHTML = `
      <p><strong>Päivämäärä:</strong> ${entry.entry_date}</p>
      <p><strong>Mieliala:</strong> ${entry.mood}</p>
      <p><strong>Uni:</strong> ${entry.sleep_hours} tuntia</p>
      <p><strong>Aktiivisuus:</strong> ${entry.notes}</p>
    `;

    card.appendChild(cardImg);
    card.appendChild(cardDiary);
    diaryContainer.appendChild(card);
  });
};
document.getElementById("fetch-all").addEventListener("click", getEntries);
export {getEntries};

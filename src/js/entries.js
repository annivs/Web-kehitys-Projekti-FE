import { fetchData } from "./fetch.js";

const getEntries = async () => {
  // Piilotetaan Poista merkintä -nappi ennen fetchausta
  const deleteButton = document.querySelectorAll('delete-btn');
  deleteButton.forEach(button => button.style.display = 'none');
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
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Poista merkintä';
      deleteButton.classList.add('delete-btn');
      
      // Asetetaan nappi piiloon heti aluksi
      deleteButton.style.display = 'none';
      
      // Lisätään delete-tapahtumankuuntelija
      deleteButton.addEventListener('click', () => {
        deleteEntry(entry.entry_id);
      });
      
      // Lisätään Poista merkintä -painike korttiin
      cardDiary.appendChild(deleteButton);
      
      // Lisätään kortti ja napit näkyville
      card.appendChild(cardImg);
      card.appendChild(cardDiary);
      diaryContainer.appendChild(card);
      
      // Näytetään nappi vasta kortin luomisen jälkeen
      deleteButton.style.display = 'inline-block';
    });
  };

const deleteEntry = async (entryId) => {
  const token = localStorage.getItem('token');

  // Jos token ei ole saatavilla, ei voida tehdä pyyntöä
  if (!token) {
    console.log('Ei ole kirjautuneita käyttäjiä');
    return;
  }

  const url = `http://localhost:3000/api/entries/${entryId}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    // Suoritetaan DELETE-pyyntö
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error('Virhe poistamisessa');
    }

    console.log('Päiväkirjamerkintä poistettu');
    getEntries();  // Päivitetään lista poistamisen jälkeen
  } catch (error) {
    console.error('Virhe poistamisessa', error);
    alert('Virhe poistamisessa');
  }
};

document.getElementById("fetch-all").addEventListener("click", getEntries);
export {getEntries, deleteEntry};

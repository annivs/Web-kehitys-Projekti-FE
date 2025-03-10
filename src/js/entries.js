import { fetchData } from "./fetch.js";

// getEntries-funktio
const getEntries = async () => {
  const deleteButton = document.querySelectorAll('delete-btn');
  deleteButton.forEach(button => button.style.display = 'none');
  
  const diaryContainer = document.getElementById('diary');
  const token = localStorage.getItem('token');
  
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
      <p><strong>Päivämäärä:</strong> ${new Date(entry.entry_date).toLocaleDateString("fi-FI")}</p>
      <p><strong>Mieliala:</strong> ${entry.mood}</p>
      <p><strong>Uni:</strong> ${entry.sleep_hours} tuntia</p>
      <p><strong>Aktiivisuus:</strong> ${entry.notes}</p>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Poista merkintä';
    deleteButton.classList.add('delete-btn');
    deleteButton.style.display = 'none';
    
    deleteButton.addEventListener('click', () => {
      deleteEntry(entry.entry_id);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Muokkaa merkintää';
    editButton.classList.add('edit-btn');
    editButton.style.display = 'none';
    
    editButton.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.style.display = 'flex'; 

      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

      const moodInput = document.createElement('input');
      moodInput.type = 'text';
      moodInput.value = entry.mood;
      moodInput.placeholder = 'Uusi mieliala';

      const sleepInput = document.createElement('input');
      sleepInput.type = 'text';
      sleepInput.value = entry.sleep_hours;
      sleepInput.placeholder = 'Uusi uniaika';

      const notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.value = entry.notes;
      notesInput.placeholder = 'Uudet muistiinpanot';

      const saveButton = document.createElement('button');
      saveButton.textContent = 'Tallenna muutokset';

      saveButton.addEventListener('click', () => {
        const newMood = moodInput.value;
        const newSleepHours = sleepInput.value;
        const newNotes = notesInput.value;

        if (newMood && newSleepHours && newNotes) {
          updateEntry(entry.entry_id, newMood, newSleepHours, newNotes);
        }

        modal.style.display = 'none'; 
      });

      const closeButton = document.createElement('button');
      closeButton.textContent = 'Sulje';
      closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Sulje modaali
      });

      modalContent.appendChild(moodInput);
      modalContent.appendChild(sleepInput);
      modalContent.appendChild(notesInput);
      modalContent.appendChild(saveButton);
      modalContent.appendChild(closeButton);

      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    });

    cardDiary.appendChild(deleteButton);
    cardDiary.appendChild(editButton);

    card.appendChild(cardImg);
    card.appendChild(cardDiary);
    diaryContainer.appendChild(card);

    deleteButton.style.display = 'inline-block';
    editButton.style.display = 'inline-block';
  });
};

// updateEntry-funktio
const updateEntry = async (entryId, newMood, newSleepHours, newNotes) => {
  const token = localStorage.getItem('token');
  const url = `http://localhost:3000/api/entries/${entryId}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      mood: newMood,
      sleep_hours: newSleepHours,
      notes: newNotes,
    }),
  };

  const response = await fetch(url, options);
  if (response.ok) {
    console.log('Merkintä päivitetty');
    getEntries(); // Päivitetään merkinnät
  } else {
    console.error('Merkinnän päivitys epäonnistui');
  }
};

// deleteEntry-funktio
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

export { getEntries, updateEntry, deleteEntry };
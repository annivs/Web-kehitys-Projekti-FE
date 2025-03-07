import {fetchData} from './fetch.js';

    const postDiary = async (event) => {
        event.preventDefault();

        let token = localStorage.getItem('token');

        const diaryForm = document.querySelector('.diaryForm');

        const date = document.getElementById("entryDate").value.trim();
        const sleepNotes = document.getElementById("sleepNotes").value.trim();
        const moodNotes = document.getElementById("moodNotes").value.trim();
        const activityNotes = document.getElementById("activityNotes").value.trim();

        if (!sleepNotes || !moodNotes || !activityNotes) {
            alert("Täytä kaikki kentät ennen tallennusta!");
            return;
        }

        const data = {
            entry_date: date,
            mood: moodNotes,
            sleep_hours: sleepNotes,
            notes: activityNotes,
            
        };

        const url = 'http://localhost:3000/api/entries';

        // Lähetetään tiedot tietokantaan
        const options = {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            };

            console.log(options);

            const response = await fetchData(url, options)

            if (response.error) {
                console.error('Päiväkirjamerkintä ei mennyt läpi')
            }

            console.log(response);
            diaryForm.reset();

        }

const diaryBtn = document.querySelector('#saveButton');
diaryBtn.addEventListener('click', postDiary);



import {fetchData} from './fetch.js';


const registerUser = async (event) => {
  event.preventDefault();

  // Haetaan oikea formi
  const registerForm = document.querySelector('.registerForm');

  // Haetaan formista arvot
  const username = registerForm.querySelector('#username').value.trim();
  const password = registerForm.querySelector('#password').value.trim();
  const email = registerForm.querySelector('#email').value.trim();

  // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  // Endpoint
  const url = 'http://127.0.0.1:3000/api/users';

  // Options
  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log(options);

  // Hae data
  const response = await fetchData(url, options);

  const loginResponse = document.getElementById('loginResponse'); // Palaute

  if (response.error) {
    loginResponse.textContent = 'Rekisteröinti epäonnistui: ' + response.error;
    loginResponse.className = 'error'; // Virheviesti
    loginResponse.classList.add('show');
    return;
  }

  if (response.message) {
    loginResponse.textContent = 'Rekisteröityminen onnistui!';
    loginResponse.className = 'success'; // Onnistumisviesti
    loginResponse.classList.add('show');
  }


  console.log(response);
  registerForm.reset(); // tyhjennetään formi
};

const loginUser = async (event) => {
    event.preventDefault();
  
    // Haetaan oikea formi
    const loginForm = document.querySelector('.loginForm');
  
    // haetaan formista arvot tällä kertaa 
    const username = loginForm.querySelector('#username').value.trim();
    const password = loginForm.querySelector('#password').value.trim();
  
    // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
    const bodyData = {
      username: username,
      password: password,
    };
  
    // Endpoint
    const url = 'http://localhost:3000/api/auth/login';
  
    // Options
    const options = {
      body: JSON.stringify(bodyData),
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    };
    console.log(options);
  
    // Hae data
    const response = await fetchData(url, options);
  
    if (response.error) {
      loginResponse.textContent = 'Kirjautuminen epäonnistui: ' + response.error;
      loginResponse.className = 'error'; // Virheviesti
      loginResponse.classList.add('show');
      loginForm.reset(); // Tyhjennetään lomake 

      setTimeout(function() {
        loginResponse.classList.remove('show');
        loginResponse.textContent = ''; 
      }, 3000); // Ilmoitus kestää 3 sekuntia
      return;
    }
    
    if (response.token) {
      loginResponse.textContent = 'Kirjautuminen onnistui!';
      loginResponse.className = 'success'; // Onnistumisviesti
      loginResponse.classList.add('show');
      localStorage.setItem('token', response.token); // Tallennetaan token localStorageen
      console.log('Kirjautuminen onnistui! Token:', response.token); // Tulostetaan token konsoliin
      await checkuser(); // Tuodaan piilotetut sivut esiin
      loginForm.reset(); // Tyhjennetään lomake


      setTimeout(function() {
        loginResponse.classList.remove('show');
        loginResponse.textContent = '';
      }, 3000); // Ilmoitus kestää 3 sekuntia
    }

  };

  const checkuser = async (event) => {  
    const url = 'http://localhost:3000/api/auth/me';
    const token = localStorage.getItem('token');

    if (!token) {
        console.error("Ei tokenia tallennettuna.");
        return;
    }

    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    console.log("Lähetetään pyyntö:", options);

    const response = await fetchData(url, options);

    if (response.error) {
        console.error('Virhe käyttäjän tarkistuksessa:', response.error);
        return;
    }

    if (response.token) {
        localStorage.setItem('token', response.token); // Päivitä token vain jos se tulee vastauksessa
    }

    console.log("Käyttäjän tiedot:", response);

    loginForm.reset(); // Tyhjennä lomake
    window.location.href = "/index.html";
    // Päivitetään navigaatio heti onnistuneen kirjautumisen jälkeen
    paivitaNavigaatio();
};

// Päivitä navigaatio
function paivitaNavigaatio() {
    const token = localStorage.getItem("token");
    const authLinks = document.querySelectorAll(".auth-link");
    const logoutButton = document.getElementById("logoutButton");
    const login = document.getElementById("login");

    if (token) {
        authLinks.forEach(link => link.style.display = "block");
        logoutButton.style.display = "block"; // Näytä "Kirjaudu ulos" -nappi
        login.style.display = "none"
    } else {
        authLinks.forEach(link => link.style.display = "none");
        logoutButton.style.display = "none"; // Piilota "Kirjaudu ulos" -nappi
        login.style.display = "block"; // Näytä "Kirjaudu ulos" -nappi

    }
}


// Suorita navigaation päivitys, kun sivu latautuu
document.addEventListener("DOMContentLoaded", paivitaNavigaatio);

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token"); // Poistetaan token
  paivitaNavigaatio(); // Päivitetään navigaatio ilman sivun lataamista
  window.location.href = "/index.html";
});


const registerForm = document.querySelector('.registerForm');
registerForm.addEventListener('submit', registerUser);

const loginForm = document.querySelector('.loginForm');
loginForm.addEventListener('submit', loginUser);

const meRequest = document.querySelector('#meRequest');
meRequest.addEventListener('click', checkuser);

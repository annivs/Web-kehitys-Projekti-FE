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

  if (response.error) {
    console.error('Error adding a new user:', response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
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
      console.error('Error loginning in:', response.error);
      return;
    }
  
    if (response.token) {
      console.log('Kirjautuminen onnistui! Token:', response.token);
      localStorage.setItem('token', response.token); // Tallennetaan token localStorageen
    } else {
      console.error('Virhe: Tokenia ei palautettu.');
    }
  
    if (response.message) {
      console.log(response.message, 'success');
    }
  
    console.log(response);
    loginForm.reset(); // tyhjennetään formi
  };

  const checkuser = async (event) => {  
  
    // Endpoint
    const url = 'http://localhost:3000/api/auth/me';
    
    let headers = {};

    const token = localStorage.getItem('token');

    headers = {
        Authorization: `Bearer ${token}`
    };
    // Options
    const options = {
      headers: headers,
    };
    console.log(options);
  
    // Hae data
    const response = await fetchData(url, options);
  
    if (response.error) {
      console.error('Error cheking new user:', response.error);
      return;
    }
  
    if (response.message) {
        console.log(response.message, 'success');
        localStorage.setItem('token', response.token);
    }
  
    console.log(response);
    loginForm.reset(); // tyhjennetään formi
  };
  document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const authLinks = document.querySelectorAll(".auth-link");
    const logoutButton = document.getElementById("logoutButton");
  
    if (token) {
        // Käyttäjä on kirjautunut -> näytetään sivut "Omat tietoni" ja "Päivän hyvinvointimittari"
        authLinks.forEach(link => link.style.display = "block");
        logoutButton.style.display = "block"; // Näytetään "Kirjaudu ulos" -nappi
    } else {
      logoutButton.style.display = "none"; // Piilotetaan "Kirjaudu ulos" -nappi
    }
  });
  
  logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token"); // Poistetaan token
      window.location.reload(); // Päivitetään sivu
  });



const registerForm = document.querySelector('.registerForm');
registerForm.addEventListener('submit', registerUser);

const loginForm = document.querySelector('.loginForm');
loginForm.addEventListener('submit', loginUser);

const meRequest = document.querySelector('#meRequest');
meRequest.addEventListener('click', checkuser);

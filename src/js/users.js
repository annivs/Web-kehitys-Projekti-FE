import { fetchData } from "./fetch.js";

// --- Dialogi ---
const dialog = document.querySelector('.info_dialog');
const closeButton = dialog.querySelector('button');
closeButton.addEventListener('click', () => {
  dialog.close();
});

// --- getUsers ---
const getUsers = async () => {
  const url = 'http://localhost:3000/api/users';
  let headers = {};
  
  let token = localStorage.getItem('token');
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }

  const options = {
    headers: headers,
  };

  const users = await fetchData(url, options);
  if (users.error) {
    console.log('Tapahtui virhe fetch haussa!!');
    return;
  }

  console.log(users);

  const tableBody = document.querySelector('.tbody');
  tableBody.innerHTML = ''; // Tyhjennetään taulukko

  users.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td><button class="check" data-id="${user.user_id}">Info</button></td>
      <td><button class="del" data-id="${user.user_id}">Delete</button></td>
      <td>${user.user_id}</td>
    `;
    tableBody.appendChild(row);
  });

  addEventListeners();
};

// --- getUserById ---
const getUserById = async (userId) => {
  const user = await fetchData(`http://localhost:3000/api/users/${userId}`);
  
  if (user.error) {
    console.error(`Virhe käyttäjän hakemisessa ID:llä ${userId}:`, user.error);
    alert(`Virhe: ${user.error}`);
    return null;
  }
  return user;
};

// --- addUser ---
const addUser = async (event) => {
  event.preventDefault();

  // Haetaan formista oikeat tiedot
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();
  const email = document.querySelector('#email').value.trim();

  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  const url = 'http://localhost:3000/api/users';
  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };

  const response = await fetchData(url, options);

  if (response.error) {
    console.log(response.error);
    showSnackbar('Virhe lähettämisessä, täytä kaikki vaadittavat kentät!', 'error');
    return;
  }

  if (response.message) {
    console.log(response.message);
    showSnackbar('Onnistunut käyttäjän lisääminen.');
  }

  document.querySelector('.addform').reset();
  getUsers();
};

const addEventListeners = () => {
  const checkButtons = document.querySelectorAll('.check');
  checkButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const userId = event.target.dataset.id;
      const user = await getUserById(userId);

      if (user) {
        dialog.querySelector('p').innerHTML = `
          <div>User ID: <span>${user.user_id}</span></div>
          <div>User Name: <span>${user.username}</span></div>
          <div>Email: <span>${user.email}</span></div>
          <div>Role: <span>${user.user_level}</span></div>`;
        dialog.showModal();
      }
    });
  });
};

document.getElementById("fetch-users").addEventListener("click", getUsers);
document.getElementById("create-user").addEventListener("click", addUser);

export { getUsers, addUser };

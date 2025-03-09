import { fetchUsers, createNewUser, getUserById, fetchEntries, deleteEntry, getEntryById } from "./fetch.js";

const userTableBody = document.getElementById("users-table-body");
const fetchButton = document.getElementById("fetch-users");
const newUserButton = document.getElementById("create-user");
const dialog = document.querySelector(".info_dialog");
const closeButton = document.querySelector(".info_dialog button");

const cardArea = document.querySelector(".card-area");

const createUserRow = (user) => {
    const tr = document.createElement("tr");
    
    const usernameTd = document.createElement("td");
    usernameTd.textContent = user.username;

    const emailTd = document.createElement("td");
    emailTd.textContent = user.email;

    const infoTd = document.createElement("td");
    const infoButton = document.createElement("button");
    infoButton.textContent = "Info";
    infoButton.classList.add("info-button");
    infoTd.appendChild(infoButton);

    const deleteTd = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteTd.appendChild(deleteButton);

    const idTd = document.createElement("td");
    idTd.textContent = user.user_id;

    tr.append(usernameTd, emailTd, infoTd, deleteTd, idTd);

    return tr;
};

const updateUserTable = async () => {
    const users = await fetchUsers();
    userTableBody.replaceChildren(...users.map((user) => createUserRow(user)));
};

const deleteFromUserTable = async (id) => {
    await deleteUser(id);
    updateUserTable();
};

const createUser = async () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await createNewUser(username, email, password);
    updateUserTable();
};

fetchButton.addEventListener("click", updateUserTable);

userTableBody.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-button")) {
        const row = event.target.closest("tr");
        const id = row.getElementsByTagName("td")[4].textContent;
        await deleteFromUserTable(id);
    }
});

userTableBody.addEventListener("click", async (event) => {
    if (event.target.classList.contains("info-button")) {
        const row = event.target.closest("tr");
        const id = row.getElementsByTagName("td")[4].textContent;

        try {
            const user = await getUserById(id);
            dialog.querySelector("p").textContent = `Username: ${user.username}\nEmail: ${user.email}\nID: ${user.user_id}`;
            dialog.showModal();
        } catch (error) {
            console.error("Käyttäjätietojen hakeminen epäonnistui:", error);
        }
    }
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

newUserButton.addEventListener("click", createUser);
// === 🧱 Étape 1 : Sélection des éléments ===
const form = document.getElementById("contactForm");
const nomInput = document.getElementById("nom");
const emailInput = document.getElementById("email");
const contactList = document.getElementById("contactList");

// === 📦 Chargement des contacts depuis localStorage ===
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

let indexAModifier = null; // Sert à savoir si on est en mode "modifier"

afficherContacts(); // Affiche au chargement

// === ➕ Ajout OU mise à jour d’un contact ===
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = nomInput.value.trim();
  const email = emailInput.value.trim();

  if (!nom || !email) return;

  const contact = { nom, email };

  if (indexAModifier === null) {
    // Ajout
    contacts.push(contact);
  } else {
    // Mise à jour
    contacts[indexAModifier] = contact;
    indexAModifier = null;
    form.querySelector("button").textContent = "Ajouter";
  }

  nomInput.value = "";
  emailInput.value = "";
  sauvegarder();
  afficherContacts();
});

// === 🗂️ Afficher la liste des contacts ===
function afficherContacts() {
  contactList.innerHTML = "";

  contacts.forEach((contact, index) => {
    const ligne = document.createElement("tr");

    ligne.innerHTML = `
      <td>${contact.nom}</td>
      <td>${contact.email}</td>
      <td class="actions">
        <button class="edit">✏ Modifier</button>
        <button class="delete">✖ Supprimer</button>
      </td>
    `;

    // === ✏ Modifier un contact ===
    ligne.querySelector(".edit").addEventListener("click", () => {
      nomInput.value = contact.nom;
      emailInput.value = contact.email;
      indexAModifier = index;
      form.querySelector("button").textContent = "Mettre à jour";
    });

    // === ✖ Supprimer un contact ===
    ligne.querySelector(".delete").addEventListener("click", () => {
      contacts.splice(index, 1);
      sauvegarder();
      afficherContacts();
    });

    contactList.appendChild(ligne);
  });
}

// === 💾 Sauvegarder dans localStorage ===
function sauvegarder() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

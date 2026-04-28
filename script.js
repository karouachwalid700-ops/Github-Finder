// Données de test - profils GitHub

const testUsers = [
    {
        id: 1,
        login: "torvalds",
        name: "Linus Torvalds",
        avatar_url: "https://avatars.githubusercontent.com/u/1024588?v=4",
        bio: "Linux creator",
        followers: 200000,
        following: 0,
        public_repos: 50
    },
    {
        id: 2,
        login: "gvanrossum",
        name: "Guido van Rossum",
        avatar_url: "https://avatars.githubusercontent.com/u/6490553?v=4",
        bio: "Python creator",
        followers: 50000,
        following: 50,
        public_repos: 30
    }
];

// Repositories de test

const testRepos = [
    {
        name: "linux",
        description: "Linux kernel",
        language: "C",
        stargazers_count: 15000,
        forks_count: 2000,
        html_url: "https://github.com/torvalds/linux"
    },
    {
        name: "cpython",
        description: "Python interpreter",
        language: "C",
        stargazers_count: 50000,
        forks_count: 23000,
        html_url: "https://github.com/python/cpython"
    }
];

const state = {
    currentUser: null,      // Utilisateur actuellement affiché
    bookmarks: [],          // Favoris sauvegardés
    isViewingBookmarks: false  // Affiche favoris ou résultats?
};

// Récupérer les Éléments du DOM

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const userProfile = document.getElementById('userProfile');
const reposList = document.getElementById('reposList');
const welcomeState = document.getElementById('welcomeState');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const favorisListt = document.getElementById('favoris-List');
const favorisCount = document.getElementById('favoris-count');

// Créer une Fonction pour Afficher le Profil

function displayUserProfile(user) {
    userProfile.innerHTML = `
        <div class="profile-card">
            <img src="${user.avatar_url}" alt="Profile">

            <h2>${user.name}</h2>
            <div class="username">@${user.login}</div>
            <div class="bio">${user.bio}</div>

            <div class="stats">
                <div><strong>${user.public_repos}</strong> Repos</div>
                <div><strong>${user.followers}</strong> Followers</div>
                <div><strong>${user.following}</strong> Following</div>
            </div>
        </div>
    `;

    userProfile.style.display = "block";
    welcomeState.style.display = "none";
}


// Créer une Fonction pour Afficher les Repositories

function displayRepositories(repos) {

    reposList.innerHTML = "";

    repos.forEach(repo => {

        const card = document.createElement("div");
        card.classList.add("repo-card");

        card.innerHTML = `
            <h4>${repo.name}</h4>
            <p>${repo.description || "Pas de description"}</p></br>
            <div>
              <span>${repo.language}</span>
              ⭐ ${repo.stargazers_count}   ||   🍴 ${repo.forks_count}
            </div>
        `;

        reposList.appendChild(card);
    });
}


// Créer des Fonctions pour Gérer les États

// Afficher le loader
function showLoading() {
   loadingState.style.display = "block"
   welcomeState.style.display = "none"
   errorState.style.display = "none"
}

// Afficher une erreur
function showError(message) {
    errorState.style.display = "block";
    errorState.textContent = message;

    loadingState.style.display = "none"
    welcomeState.style.display = "none"
}

// Afficher l'écran d'accueil
function showWelcome() {
    welcomeState.style.display = "block"
    loadingState.style.display = "none"
    errorState.style.display = "none"
}


// Créer une Fonction de Recherche de Test

function searchUserLocal(username) {

    showLoading();

    setTimeout(() => {

        const user = testUsers.find(u => u.login === username);

        if (!user) {
            showError("Utilisateur non trouvé");
            return;
        }

        loadingState.style.display = "none";

        displayUserProfile(user);
        displayRepositories(testRepos);

    }, 1000);


    console.log(repos);
}

// Ajouter des Event Listeners

// Clic sur le bouton recherche
searchBtn.addEventListener('click', () => {
   const username = searchInput.value.trim();

   if(username === ""){
    showError("Veuillez entrer un username");
    return;
   }

   searchUserLocal(username);
});

searchInput.addEventListener('keypress', (e) => {
   if(e.key === "Enter"){
        const username = searchInput.value.trim();
        searchUserLocal(username);
    }
});

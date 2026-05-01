// STATE
const state = {
  currentUser: null,
  repos: [],
  bookmarks: []
};

// DOM ELEMENTS
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const userProfile = document.getElementById('userProfile');
const reposList = document.getElementById('reposList');
const welcomeState = document.getElementById('welcomeState');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const favorisListt = document.getElementById('favoris-List');
const favorisCount = document.getElementById('favoris-count');
// ===========
const favBtnHeader = document.querySelector('.fav-btn');
const favoritesSection = document.querySelector('.favorites-section');
const profileContainer = document.querySelector('.profile-container');
const heroSection = document.getElementById('welcomeState');

let showFavOnly = false;

// LOCAL STORAGE
function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(state.bookmarks));
}

function loadFavorites() {
  const data = localStorage.getItem("favorites");
  state.bookmarks = data ? JSON.parse(data) : [];
}

// UI STATES
function showLoading() {
  loadingState.style.display = "block";
  errorState.style.display = "none";
  welcomeState.style.display = "none";
  userProfile.style.display = "none";
  reposList.innerHTML = "";
}

function showError(message) {
  errorState.style.display = "block";
  errorState.textContent = message;
  loadingState.style.display = "none";
  welcomeState.style.display = "none";
}

function showWelcome() {
  welcomeState.style.display = "block";
  loadingState.style.display = "none";
  errorState.style.display = "none";
}

// API - USER
async function fetchUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
    Authorization: `token ${env.Token}`
  }
    }
    );
    if (!response.ok) throw new Error("User not found");
    return await response.json();
  } catch (error) {
    showError(error.message);
    return null;
  }
}

// API - REPOS
async function fetchUserRepos(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=5`,
  {
    headers: {
      Authorization: `token ${env.Token}`
    }
  });
    if (!response.ok) throw new Error("Error fetching repositories");
    return await response.json();
  } catch (error) {
    showError(error.message);
    return null;
  }
}

// DISPLAY USER
function displayUser(user) {
  userProfile.innerHTML = `
    <h2 class = "titre-prof">Profile</h2>
    
    <div class="profile-card">
      <img src="${user.avatar_url}" alt="avatar">
      <h2>${user.name || "No name"}</h2>
      <p class = "username">@${user.login}</p>
      </br>
      <p>${user.bio || "No bio"}</p>
      </br>
      <div class="stats">
        <span>Repos ${user.public_repos}</span>
        </br>
        <span>Followers ${user.followers}</span>
        </br>
        <span>Following ${user.following}</span>
      </div>
      <a href="${user.html_url}" target="_blank">Visit GitHub Profile</a>
      <button id="favBtn">Add to Favorites</button>
    </div>
  `;

  userProfile.style.display = "block";

  document.getElementById("favBtn").addEventListener("click", () => {
    addToFavorites(user);
  });
}

// DISPLAY REPOS
function displayRepos(repos) {
  reposList.innerHTML = "<h2>Repositories</h2>";

  repos.forEach(repo => {
    const card = document.createElement("div");
    card.classList.add("repo-card");
    card.innerHTML = `
      <h4>${repo.name}</h4>
      <p>${repo.description || "No description"}</p>
      </br>
      <div>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</div>
    `;
    reposList.appendChild(card);
  });
}

  // FAVORITES
function addToFavorites(user) {
  const exists = state.bookmarks.find(u => u.login === user.login);
  if (!exists) {
    state.bookmarks.push(user);
    saveFavorites();
    displayFavorites();
  }
}

function removeFromFavorites(username) {
  state.bookmarks = state.bookmarks.filter(u => u.login !== username);
  saveFavorites();
  displayFavorites();
}
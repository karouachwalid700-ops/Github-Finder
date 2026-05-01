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


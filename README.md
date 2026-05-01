# 🔎 GitFinder

GitFinder is a web application that allows you to search for GitHub users and display their profile information along with their repositories. You can also save your favorite users.

---

## 🚀 Features

* 🔍 Search for any GitHub user
* 👤 Display user profile:

  * Avatar
  * Name
  * Bio
  * Number of repositories
  * Followers / Following
* 📦 Show top 5 repositories
* ⭐ Add to favorites
* ❌ Remove from favorites
* 👁️ View profile from favorites
* 💾 Favorites saved in LocalStorage

---

## 🛠️ Technologies

* HTML5
* CSS3
* JavaScript
* GitHub REST API

---

## ⚙️ Installation

```bash
git clone https://github.com/karouachwalid700-ops/Github-Finder.git
```

Then open `Acceuil.html` in your browser.

---

## 🔐 Configuration

Add your GitHub token in `config.js`:

```javascript
const env = {
  Token: "YOUR_GITHUB_TOKEN"
};
```

---

## 📁 Project Structure

```
gitfinder/
│── Acceuil.html
│── style.css
│── script.js
│── config.js
│── README.md
```

---

## 🧠 How It Works

* User enters a GitHub username
* App sends a request to GitHub API
* Profile and repositories are displayed
* Favorites are stored in the browser

---

## 🎨 UI Highlights

* Modern dark design
* Loading animations
* Clean card layout
* Smooth user experience

---

## 👨‍💻 Author

Developed by **OUALID KAROUACH**

---

## ⭐ Support

If you like this project, give it a star ⭐ on GitHub!
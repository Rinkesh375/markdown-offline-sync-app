# 📝 Markdown Offline Sync App

A blazing fast Markdown note-taking app with **offline support**, **automatic synchronization**, and **conflict resolution**. Create, update, and delete notes seamlessly — even when you're offline. Changes sync automatically once you're back online.

👉 [Live Demo](https://markdown-offline-sync-app.vercel.app/)

---

## 🚀 Features

- ✅ **Offline-first**: Works perfectly without an internet connection using **IndexedDB**.
- 🔄 **Auto Sync**: When reconnected, all local changes sync automatically to the server.
- 🔍 **Global Search**: Search local notes by title or content.
- 🛠 **Conflict Resolution**: Merges updates based on latest timestamps.
- 🧠 **Sync Status Badges**: Visual indicators for note sync status — `synced`, `syncing`, or `not synced`.
- ✍️ **Markdown Editor**: Rich editing experience for Markdown content.

---

## 📦 Tech Stack

- **Frontend**: React + TypeScript
- **Local Storage**: IndexedDB (`idb`)
- **Hooks**: Custom hooks for online status, debounce, and syncing
- **Deployment**: [Vercel](https://vercel.com)

---

## 🧰 Project Structure


---

## 💻 Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Rinkesh375/markdown-offline-sync-app.git
cd markdown-offline-sync-app

npm install
# or
yarn install



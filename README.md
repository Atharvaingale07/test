# Flower Categorizer — One Page App

A tiny single-page application to categorize flowers. It uses vanilla HTML/CSS/JS and stores data in the browser's `localStorage`.

Files added in this commit
- `index.html` — the single-page UI
- `styles.css` — simple styles for layout and components
- `app.js` — application logic (add / edit / delete / filter, localStorage)

How to run
- Clone the repository or download the files.
- Open `index.html` in a browser (no server required).

Usage
- Add a flower name and pick a category, then click "Add Flower".
- Use the Filter dropdown to view a specific category.
- Click "Edit" to modify an existing item, or "Delete" to remove it.
- Use "Clear All" to remove all stored flowers.

Notes & next steps
- The app stores data in `localStorage` scoped to your browser. Clearing browser storage will remove saved flowers.
- Possible enhancements: image upload, tags, search, sorting, or converting to a React/Vue app with persistent backend storage.


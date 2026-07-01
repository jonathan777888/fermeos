# Ferme OS - Field Dashboard

Ferme OS is a simple web MVP for managing vegetable farm operations: field observations, farm tasks, quality control, and team updates.

## Features

- Dashboard with quick operational indicators
- Field observations by parcel, crop, issue type, and severity
- Task creation and task status tracking
- Quality control: sellable, downgraded, donation, and loss
- Team feed for field updates
- Browser storage with localStorage
- Compatible with GitHub Pages

## Project structure

```text
ferme-os/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Run locally

Open `index.html` in a browser.

Or with VS Code:

1. Install the Live Server extension
2. Right-click `index.html`
3. Choose `Open with Live Server`

## Publish with GitHub Pages

1. Create or open your GitHub repository
2. Upload the project files
3. Go to `Settings > Pages`
4. Choose `Deploy from a branch`
5. Branch: `main`, folder: `/root` or `/`
6. Save

Your app will be published at a URL similar to:

```text
https://your-github-username.github.io/your-repository-name/
```

For Jonathan's repository, the likely URL is:

```text
https://jonathan777888.github.io/fermeos/
```

## Next improvements

- User login
- CSV export for observations
- Field photo uploads
- Filters by parcel and crop
- Firebase or Supabase database
- Bubble/no-code version connected to the same data model

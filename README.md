# Ferme OS - Field Dashboard

Ferme OS est un MVP web simple pour suivre les operations d'une ferme maraichere : observations de champ, taches, controle qualite et messages d'equipe.

## Fonctionnalites

- Dashboard avec indicateurs rapides
- Ajout d'observations par parcelle, culture, type de probleme et gravite
- Creation et suivi des taches terrain
- Controle qualite : vendable, declasse, don, perte
- Fil d'equipe pour les messages terrain
- Donnees sauvegardees dans le navigateur avec localStorage
- Compatible GitHub Pages

## Structure

```text
ferme-os/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Lancer localement

Ouvrir `index.html` dans un navigateur.

Ou avec VS Code :

1. Installer l'extension Live Server
2. Clic droit sur `index.html`
3. Choisir `Open with Live Server`

## Publier sur GitHub Pages

1. Creer un depot GitHub appele `ferme-os`
2. Ajouter les fichiers du projet
3. Aller dans `Settings > Pages`
4. Choisir `Deploy from a branch`
5. Branch: `main`, folder: `/root`
6. Enregistrer

## Prochaines ameliorations

- Connexion utilisateur
- Export CSV des observations
- Ajout de photos terrain
- Filtres par parcelle et culture
- Base de donnees Firebase ou Supabase
- Version Bubble/no-code connectee au meme modele de donnees

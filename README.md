# API Films

Cette API gère les opérations CRUD (Create, Read, Update, Delete) pour une entité "film".

## 1. Liste des films 

### Endpoint

GET /film

### Description 

Récupère la liste complète de tous les films.

### Exemple de réponse

```json
[
  {
    "id": 1,
    "nom": "Titre du film",
    "description": "Description du film",
    "date_parution": "2023-01-01",
    "note": 4
  },
  // ... autres films ...
]

```

## 1. Détail d'un films 

### Endpoint

GET /film/:id

### Description 

Récupère le détail d'un film par son ID.

### Exemple de réponse

```json
{
    "id": 1,
    "nom": "Titre du film",
    "description": "Description du film",
    "date_parution": "2023-01-01",
    "note": 4
},

```

## 3. Ajout d'un film

### Endpoint

GET /film/create

### Description 

Ajoute un nouveau film à la base de données.

### Paramètre du corps de la requête

* nom: Nom du film *
* description: Description du film *
* date_parution: Date de parution du film
* note: note du film

### Exemple de requête

```json
{
    "nom": "Nouveau film",
    "description": "Description du nouveau film",
    "date_parution": "2023-01-01",
    "note": 4
}
```
### Exemple de requête

```json
{
  "message": "Film ajouté avec succès",
  "insertId": 6
}


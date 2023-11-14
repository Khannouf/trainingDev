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

* nom: Nom du film 
* description: Description du film 
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
### Exemple de réponse

```json
{
  "message": "Film ajouté avec succès",
  "insertId": 6
}
```

## 4. Mise à jour d'un film

### Endpoint

GET /film/update/:id

### Description 

Mise à jour d'un film spécifié par son ID

### Paramètres

* id: ID du film à mettre à jour 

### Paramètre du corps de la requête

* nom: Nouveau nom du film 
* description: Nouvelle description du film 
* date_parution: Nouvelle date de parution du film
* note: Nouvelle note du film

### Exemple de requête

```json
{
    "nom": "Nouveau Titre",
    "description": "Nouvelle Description film",
    "date_parution": "2023-02-01",
    "note": 5
}
```
### Exemple de réponse

```json
{
  "message": "Film mis à jour avec succès",
}
```
## 4. Suppression d'un film

### Endpoint

GET /film/delete/:id

### Description 

Supprime un film spécifié par son ID.

### Paramètre 

* id: ID du film à supprimer 

### Exemple de réponse

```json
{
  "message": "Film supprimé avec succès",
}




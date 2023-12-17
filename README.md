# API Films

Cette API gère les opérations CRUD (Create, Read, Update, Delete) pour une entité "film", une entité "category" et permet la gestion des catégories associées aux films.

## 1. Liste des films 

### Endpoint

GET /films

### Paramètres de requête

- `query` (optionnel) : Terme de recherche pour filtrer les films par leur nom ou description.
- `limit` (optionnel) : Nombre maximal de films à retourner (par défaut 10, max 50).
- `page` (optionnel) : Numéro de page pour la pagination (commence à 1).

### Description 

Récupère une liste paginée de films. Si un terme de recherche `query` est fourni, les films sont filtrés en fonction de leur nom ou de leur description. La pagination est gérée via les paramètres `limit` et `page`.

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
  // ... autres films selon la pagination et la requête de recherche ...
]
```

## 2. Détail d'un film 

### Endpoint

GET /films/:id

### Description 

Récupère le détail d'un film par son ID, incluant ses catégories.

### Exemple de réponse

```json
{
    "id": 1,
    "nom": "Titre du film",
    "description": "Description du film",
    "date_parution": "2023-01-01",
    "note": 4,
    "categories": [
      {
        "id": 1,
        "nom": "Action"
      },
      {
        "id": 3,
        "nom": "Drame"
      }
    ]
},

```

## 3. Ajout d'un film

### Endpoint

POST /films

### Description 

Ajoute un nouveau film à la base de données, avec la possibilité d'associer des catégories.

### Paramètre du corps de la requête

* nom: Nom du film 
* description: Description du film 
* releaseDate: Date de parution du film
* rating: Note du film (optionnel)
* categories: Tableau des noms de catégories (optionnel)

### Exemple de requête

```json
{
    "nom": "Nouveau film",
    "description": "Description du nouveau film",
    "releaseDate": "2023-01-01",
    "rating": 4,
    "categories": ["Action", "Aventure"]
}
```
### Exemple de réponse

```json
{
	"type": "success",
	"data": {
		"film": {
			"id": 11,
			"nom": "Nouveau film",
			"description": "Description du nouveau film",
			"date_parution": "2023-01-01",
			"note": 4
		},
		"categories": [
			{
				"id": 1,
				"nom": "Action"
			},
			{
				"id": 5,
				"nom": "Aventure"
			}
		]
	}
}
```

## 4. Mise à jour d'un film

### Endpoint

PATCH /films/:id

### Description 

Mise à jour d'un film spécifié par son ID, avec la possibilité de modifier les catégories associées.

### Paramètres

* id: ID du film à mettre à jour 

### Paramètre du corps de la requête

* nom: Nouveau nom du film 
* description: Nouvelle description du film 
* releaseDate: Nouvelle date de parution du film
* rating: Nouvelle note du film (optionnel)
* categories: Tableau des noms de catégories à associer (optionnel)

### Exemple de requête

```json
{
    "nom": "Nouveau Titre",
    "description": "Nouvelle Description du film",
    "releaseDate": "2023-02-01",
    "rating": 5,
    "categories": ["Comédie", "Drame"]
}
```
### Exemple de réponse

```json
{
	"type": "success",
	"message": "Film updated."
}
```
## 5. Suppression d'un film

### Endpoint

DELETE /films/:id

### Description 

Supprime un film spécifié par son ID, ainsi que ses associations de catégories.

### Paramètre 

* id: ID du film à supprimer 

### Exemple de réponse

```json
{
	"type": "success",
	"message": "Film removed successfully."
}




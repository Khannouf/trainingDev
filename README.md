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

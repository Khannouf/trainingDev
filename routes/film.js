const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require('../connexion')

router.get("/", (req, res) => {
  connection.query("SELECT * FROM film", (err, rows, fields) => {
    res.status(200).json(rows);
  });
});

router.get("/:id", (req, res) =>{
  const id = req.params.id
  

  connection.query("SELECT * FROM film WHERE id =" +id, (err, rows, fields) => {
    res.status(200).json(rows);
  });
})

router.post('/create', (req, res) => {
  try {
    const { nom, description, date_parution, note } = req.body;
    console.log(req.body);

    // Assurez-vous que toutes les données nécessaires sont présentes dans la requête
    if (!nom || !description || !date_parution) {
      return res.status(404).json({ message: 'Nom, description et date de parution sont requis.' });
    }

    // Exécutez la requête SQL pour insérer le nouveau film dans la table
    const result =  connection.query('INSERT INTO film (nom, description, date_parution, note) VALUES (?, ?, ?, ?)', [nom, description, date_parution, note]);

    // Envoyez une réponse réussie
    res.status(201).json({ message: 'Film ajouté avec succès', insertId: result.insertId });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du film :', error);
    res.status(422).json({ message: 'Erreur lors de l\'ajout du film.' });
  }
});

router.put('/update/:id', (req, res) => {
  try {
    const { nom, description, date_parution, note } = req.body;
    const filmId = req.params.id;

    // Assurez-vous que toutes les données nécessaires sont présentes dans la requête
    if (!nom || !description || !date_parution) {
      return res.status(404).json({ message: 'Nom, description et date de parution sont requis.' });
    }
    
    connection.query("SELECT * FROM film WHERE id =" +filmId, (err, rows, fields) => {
      if(rows.length !== 0){
         // Exécutez la requête SQL pour mettre à jour le film dans la table
        const result =  connection.query(
          'UPDATE film SET nom = ?, description = ?, date_parution = ?, note = ? WHERE id = ?',
          [nom, description, date_parution, note, filmId]
        );
          res.status(200).json({ message: 'Film mis à jour avec succès' });
      }
      else{
        res.status(404).json({ message: 'Film non trouvé avec l\'ID spécifié' });
      }
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du film :', error);
    res.status(404).json({ message: 'Film non trouvé avec l\'ID spécifié' });
  }
});

router.delete('/delete/:id', (req, res) => {
  try {
    const filmId = req.params.id;

    connection.query("SELECT * FROM film WHERE id =" +filmId, (err, rows, fields) => {
      if(rows.length !== 0){
        const result = connection.query('DELETE FROM film WHERE id = ?', [filmId]);
        res.status(200).json({ message: 'Film supprimé avec succès' });
      }
      else{
        res.status(404).json({ message: 'Film non trouvé avec l\'ID spécifié' });
      }
    });
    // Exécutez la requête SQL pour supprimer le film dans la table
    // const result = connection.query('DELETE FROM film WHERE id = ?', [filmId]);

    //   res.status(200).json({ message: 'Film supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du film :', error);
    
  }
});

module.exports = router;

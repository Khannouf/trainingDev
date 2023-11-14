const express = require('express')
const app = express()
const port = 3000
const connection = require('./connexion')
connection.connect((err) => {
  if (err) {
    console.error("Erreur : " + err.stack);
  }
  console.log("Connexion réussie");
});

app.get('/', (req,res) => res.send('Hello 2'))
const films = require("./routes/film")
app.use(express.json());
app.use("/film", films)

app.listen(port, () => console.log(`démare sur le port spécifié : http://localhost:${port}`))
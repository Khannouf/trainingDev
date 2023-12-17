import "dotenv/config"

import cors from "cors"
import express from "express"

import sequelize from "./models/db.config.js"
import Films from "./routes/film.routes.js"
import Categories from "./routes/category.routes.js"

const app = express()
const port = process.env.SERVER_PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => res.send("Hello 2"))
app.use("/films", Films())
app.use("/categories", Categories())

sequelize.sync().then(() => console.log("Database connection OK"))

app.listen(port, () =>
  console.log(`démare sur le port spécifié : http://localhost:${port}`),
)

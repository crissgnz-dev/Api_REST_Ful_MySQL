import express from "express";

const app = express();
const PORT = 3000;

/* app.use(express.json()); */

app.get("/", (req, res) => {
  res.send("API_REST_Ful_MySQL");
});

app.post("/", (req, res) => {});

app.put("/", (req, res) => {});

app.delete("/", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).send("Pagina no existe");
});

import express from "express";
import pool from "./config/conexion.js";

const app = express();
const PORT = 3000;

/* app.use(express.json()); */

app.get("/", (req, res) => {
  res.send("API_REST_Ful_MySQL");
});

app.get("/users", async (req, res) => {
  const sql = "SELECT * FROM users";
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).send("error con la consulta");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM users WHERE id_users = ?";
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [id]);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).send("error con la consulta");
  }
});

app.post("/users", (req, res) => {});

app.put("/users/:id", (req, res) => {});

app.delete("/users/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).send("Pagina no existe");
});

import express from "express";
import pool from "./config/conexion.js";

const app = express();
const PORT = 3000;

app.use(express.json());

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
    // res.json(rows[0]);
    rows[0] ? res.json(rows[0]) : res.status(404).send("El usuario no existe");
  } catch (error) {
    res.status(500).send("error con la consulta");
  }
});

app.post("/users", async (req, res) => {
  const values = req.body;
  console.log(values);
  const sql = "INSERT INTO users SET ?";

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [values]);
    connection.release();

    console.log(rows);
    res.status(201).send("Usuario creado con el id: " + rows.insertId);
  } catch (error) {
    res.status(500).send("error con la consulta" + error);
  }
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const newValues = req.body;

  const sql = "UPDATE users SET ? WHERE id_users = ?";
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [newValues, id]);
    connection.release();
    rows.affectedRows === 0
      ? res.status(404).send("El usuario no existe")
      : res.send("Datos actualizados");
  } catch (error) {
    res.status(500).send("error con la consulta");
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE * FROM users WHERE id_users = ?";

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [id]);
    connection.release();
    rows.affectedRows === 0
      ? res.status(404).send("El usuario no existe")
      : res.send("Dato eliminado");
  } catch (error) {
    res.status(500).send("error con la consulta " + error);
  }
});

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).send("Pagina no existe");
});

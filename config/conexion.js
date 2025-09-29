import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda",
  connectionLimit: 5,
});

pool
  .getConnection()
  .then((connection) => {
    console.log("Conexion existosa");
    connection.release;
  })
  .catch((error) => {
    console.log("Error de conexion");
  });

export default pool;

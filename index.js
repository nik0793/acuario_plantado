const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = process.env.PORT || 3000;

// Configuración de la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener el estado de la luz
app.get("/api/luz", async (req, res) => {
  try {
    const result = await pool.query("SELECT estado FROM luces WHERE id = 1");
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al leer la base de datos" });
  }
});

// Ruta para actualizar el estado de la luz
app.post("/api/luz", async (req, res) => {
  const { estado } = req.body;
  try {
    await pool.query("UPDATE luces SET estado = $1 WHERE id = 1", [estado]);
    res.json({ message: "Estado actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la base de datos" });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
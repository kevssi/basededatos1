require("dotenv").config(); // Asegúrate de tener esta línea para cargar el archivo .env
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // Usa el puerto definido en .env o 3000 por defecto
const API_KEY = process.env.API_KEY; // La API Key desde el archivo .env

app.use(cors()); // Para permitir solicitudes CORS

// Ruta para la raíz
app.get("/", (req, res) => {
    res.send("Servidor funcionando. Usa la ruta /clima/:ciudad para obtener el clima.");
});

// Ruta para obtener el clima de una ciudad
app.get("/clima/:ciudad", async (req, res) => {
    try {
        const { ciudad } = req.params;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

        const respuesta = await axios.get(url);
        res.json(respuesta.data); // Devuelve los datos obtenidos de OpenWeatherMap al cliente
    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener el clima" });
    }
});

// Inicia el servidor en el puerto indicado
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

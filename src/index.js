const express = require("express");
const axios = require("axios");
const csvtojson = require("csvtojson");
const cors = require("cors");

const app = express();

// Configuração do CORS com opções específicas
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

const PORT = 3300;

app.get("/candidatos", async (req, res) => {
  try {
    const csvUrl =
      "https://raw.githubusercontent.com/augusto-herrmann/eleicoes-2020-planos-de-governo/main/dados/planos-de-governo.csv";

    const response = await axios.get(csvUrl);

    const json = await csvtojson().fromString(response.data);

    const candidatos = [];

    json.map((data) => {
      if (data.sigla_estado == "BA") candidatos.push(data);
    });

    res.json({ candidatos });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).send("Erro ao processar o CSV");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

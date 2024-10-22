// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.post(
  '/api/update-excel',
  express.raw({ type: 'application/octet-stream', limit: '10mb' }),
  (req, res) => {
    const filePath = path.join(__dirname, 'public', 'dados_sinteticos.xlsx');
    fs.writeFile(filePath, req.body, (err) => {
      if (err) {
        console.error('Erro ao salvar o arquivo Excel:', err);
        return res
          .status(500)
          .send({ success: false, error: 'Falha ao salvar o arquivo' });
      }
      res.send({ success: true });
    });
  }
);

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
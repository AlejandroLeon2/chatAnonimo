// main.js
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import router from './src/routes/index.js';

const app = express(); // ✅ esta línea es esencial
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.get('/', (_req, res) => {
  res.send('API funcionando 🚀')
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})



import express from 'express'
import pool from '../config/pool.js'

import usuarioModel from '../models/usuarioModel.js'
import salaModel from '../models/salaModel.js'
import mensajeModel from '../models/mensajeModel.js'

import usuarioController from '../controllers/usuarioController.js'
import salaController from '../controllers/salaController.js'
import mensajeController from '../controllers/mensajeController.js'

const router = express.Router()

const Usuario = usuarioModel(pool)
const Sala = salaModel(pool)
const Mensaje = mensajeModel(pool)


const usuario = usuarioController(Usuario)
const sala = salaController(Sala)
const mensaje = mensajeController(Mensaje)


router.post('/usuario', usuario.crear)
router.get('/usuarios', usuario.listar)


router.post('/sala', sala.crear)
router.get('/salas', sala.listar)


router.post('/mensaje', mensaje.enviar)
router.get('/sala/:id/mensajes', mensaje.obtenerPorSala)



router.get('/', async (req, res) => {
  try {
    console.log('Accediendo a /api');
    const result = await pool.query('SELECT NOW()');
    res.json({
      ok: true,
      server_time: result.rows[0].now,
    });
  } catch (error) {
    console.error('Error en /api:', error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
});


export default router;

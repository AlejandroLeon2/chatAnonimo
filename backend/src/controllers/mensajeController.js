export default (MensajeModel) => ({
  enviar: async (req, res) => {
    const { apodo, nombreSala, contenido } = req.body
    if (!apodo || !nombreSala || !contenido) {
      return res.status(400).json({ error: 'Faltan datos' })
    }

    try {
      const mensaje = await MensajeModel.crear({ apodo, nombreSala, contenido })
      res.status(201).json(mensaje)
    } catch (err) {
      res.status(500).json({ error: 'Error al enviar mensaje' })
    }
  },

  obtenerPorSala: async (req, res) => {
    try {
      const mensajes = await MensajeModel.listarPorSala(req.params.id)
      res.json(mensajes)
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener mensajes' })
    }
  }
})

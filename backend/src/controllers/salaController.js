export default (SalaModel) => ({
  crear: async (req, res) => {
    const { nombre , descripcion } = req.body
    if (!nombre || !descripcion) return res.status(400).json({ error: 'Falta el nombre de la sala' })

    try {
      const sala = await SalaModel.crear({ nombre , descripcion })
      res.status(201).json(sala)
    } catch (err) {
      res.status(500).json({ error: 'Error al crear sala' })
    }
  },

  listar: async (_req, res) => {
    try {
      const salas = await SalaModel.listar()
      res.json(salas)
    } catch (err) {
      res.status(500).json({ error: 'Error al listar salas' })
    }
  }
})

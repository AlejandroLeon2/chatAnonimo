export default (UsuarioModel) => ({
  crear: async (req, res) => {
    const { apodo } = req.body
    if (!apodo) return res.status(400).json({ error: 'Falta el apodo' })

    try {
      const usuario = await UsuarioModel.crear({ apodo })
      res.status(201).json(usuario)
    } catch (err) {
      res.status(500).json({ error: 'Error al crear usuario' })
    }
  },

  listar: async (_req, res) => {
    try {
      const usuarios = await UsuarioModel.listar()
      res.json(usuarios)
    } catch (err) {
      res.status(500).json({ error: 'Error al listar usuarios' })
    }
  }
})

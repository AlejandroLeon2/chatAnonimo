
export default (pool) => ({
  crear: async ({ nombre , descripcion }) => {
    const res = await pool.query(
      'INSERT INTO sala (nombre, descripcion, created_at) VALUES ($1, $2, NOW()) RETURNING *',
      [nombre, descripcion]
    )
    return res.rows[0]
  },

  listar: async () => {
    const res = await pool.query('SELECT * FROM sala ORDER BY created_at ASC')
    return res.rows
  }
})

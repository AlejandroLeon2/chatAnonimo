
export default (pool) => ({
  crear: async ({ apodo }) => {
    const res = await pool.query(
      'INSERT INTO usuario (apodo, created_at) VALUES ($1, NOW()) RETURNING *',
      [apodo]
    )
    return res.rows[0]
  },

  listar: async () => {
    const res = await pool.query('SELECT * FROM usuario ORDER BY created_at DESC')
    return res.rows
  }
})

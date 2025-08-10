export default (pool) => ({
  crear: async ({ apodo, nombreSala, contenido }) => {
    // Buscar ID del usuario
    const usuarioRes = await pool.query(
      'SELECT id FROM usuario WHERE apodo = $1',
      [apodo]
    );
    if (usuarioRes.rowCount === 0) throw new Error('Usuario no encontrado');
    const id_usuario = usuarioRes.rows[0].id;

    // Buscar ID de la sala
    const salaRes = await pool.query(
      'SELECT id FROM sala WHERE nombre = $1',
      [nombreSala]
    );
    if (salaRes.rowCount === 0) throw new Error('Sala no encontrada');
    const id_sala = salaRes.rows[0].id;

    // Insertar mensaje
    const mensajeRes = await pool.query(
      'INSERT INTO mensaje (id_usuario, id_sala, contenido, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [id_usuario, id_sala, contenido]
    );
    return mensajeRes.rows[0];
  },

  listarPorSala: async (id_sala) => {
    const res = await pool.query(
      'SELECT * FROM mensaje WHERE id_sala = $1 ORDER BY created_at ASC',
      [id_sala]
    );
    return res.rows;
  }
});


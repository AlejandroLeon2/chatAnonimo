export default (pool) => ({
  crear: async ({ apodo, nombreSala, contenido }) => {

    const usuarioRes = await pool.query(
      'SELECT id FROM usuario WHERE apodo = $1',
      [apodo]
    );
    if (usuarioRes.rowCount === 0) throw new Error('Usuario no encontrado');
    const id_usuario = usuarioRes.rows[0].id;


    const salaRes = await pool.query(
      'SELECT id FROM sala WHERE nombre = $1',
      [nombreSala]
    );
    if (salaRes.rowCount === 0) throw new Error('Sala no encontrada');
    const id_sala = salaRes.rows[0].id;


    const mensajeRes = await pool.query(
      'INSERT INTO mensaje (id_usuario, id_sala, contenido, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [id_usuario, id_sala, contenido]
    );
    return mensajeRes.rows[0];
  },

listarPorSala: async (id_sala, limit = 10) => {
  const res = await pool.query(
    `SELECT m.id, m.contenido, m.created_at, u.apodo AS usuario
     FROM mensaje m
     JOIN usuario u ON m.id_usuario = u.id
     WHERE m.id_sala = $1
     ORDER BY m.created_at DESC
     LIMIT $2`,
    [id_sala, limit]
  );
  return res.rows;
}


});


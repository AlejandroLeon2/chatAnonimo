-- Tabla de usuarios
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  apodo TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de salas
CREATE TABLE sala (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de mensajes
CREATE TABLE mensaje (
  id SERIAL PRIMARY KEY,
  id_usuario INTEGER REFERENCES usuario(id),
  id_sala INTEGER REFERENCES sala(id),
  contenido TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


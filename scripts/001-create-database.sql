-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS gestor_local_personas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE gestor_local_personas;

-- Tabla de usuarios (para autenticación)
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombre_completo VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de personas (integrantes)
CREATE TABLE IF NOT EXISTS personas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_completo VARCHAR(150) NOT NULL,
  documento VARCHAR(50) UNIQUE NOT NULL,
  edad INT NOT NULL,
  genero ENUM('Masculino', 'Femenino', 'Otro', 'Prefiero no decir') NOT NULL,
  direccion VARCHAR(255),
  telefono VARCHAR(20),
  ocupacion VARCHAR(100),
  estado VARCHAR(50) DEFAULT 'Activo',
  notas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_nombre (nombre_completo),
  INDEX idx_documento (documento),
  INDEX idx_estado (estado),
  INDEX idx_ocupacion (ocupacion)
);

-- Insertar usuario admin por defecto (password: admin123)
INSERT INTO usuarios (username, password_hash, nombre_completo)
VALUES ('admin', '$2b$10$rKZWvFZGz7RJJQhZ2HxGPOZ9nKZQWjNYQXGxY4YvZJ1YzQjNzZQjC', 'Administrador')
ON DUPLICATE KEY UPDATE username = username;

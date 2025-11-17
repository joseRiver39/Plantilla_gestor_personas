USE gestor_local_personas;

-- Insertar usuario admin con contraseña hasheada
-- Usuario: admin
-- Contraseña: admin123
INSERT INTO usuarios (username, password_hash, nombre_completo)
VALUES ('admin', '$2b$10$YourHashedPasswordHere.Replace.With.Actual.BCrypt.Hash.Generated', 'Administrador')
ON DUPLICATE KEY UPDATE username = username;

-- NOTA: Para generar el hash correcto de la contraseña, ejecuta el siguiente script de Node.js

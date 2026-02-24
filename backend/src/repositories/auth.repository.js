import db from '../config/db.js';

// 🔹 Buscar por email
export async function findUserByEmail(email) {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
}

// 🔹 Buscar solo id por email
export async function emailExists(email) {
  const [rows] = await db.query(
    'SELECT id FROM users WHERE email = ?',
    [email]
  );
  return rows.length > 0;
}

// 🔹 Buscar cédula
export async function cedulaExists(cedula) {
  const [rows] = await db.query(
    'SELECT id FROM users WHERE cedula = ?',
    [cedula]
  );
  return rows.length > 0;
}

// 🔹 Crear usuario
export async function createUser(data) {
  const {
    role,
    email,
    passwordHash,
    name,
    cedula,
    verificationCode,
    expires
  } = data;

  await db.query(
    `INSERT INTO users 
    (role, email, password_hash, name, cedula, is_verified, verification_code, verification_expires) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [role, email, passwordHash, name, cedula, false, verificationCode, expires]
  );
}

// 🔹 Actualizar verificación
export async function updateVerification(email, code, expires) {
  await db.query(
    `UPDATE users 
     SET verification_code = ?, verification_expires = ?
     WHERE email = ?`,
    [code, expires, email]
  );
}

// 🔹 Confirmar verificación
export async function confirmUser(email) {
  await db.query(
    `UPDATE users 
     SET is_verified = true,
         verification_code = NULL,
         verification_expires = NULL
     WHERE email = ?`,
    [email]
  );
}

// 🔹 Guardar reset code
export async function saveResetCode(email, code, expires) {
  await db.query(
    'UPDATE users SET reset_code = ?, reset_expires = ? WHERE email = ?',
    [code, expires, email]
  );
}

// 🔹 Actualizar password
export async function updatePassword(email, passwordHash) {
  await db.query(
    'UPDATE users SET password_hash = ?, reset_code = NULL, reset_expires = NULL WHERE email = ?',
    [passwordHash, email]
  );
}
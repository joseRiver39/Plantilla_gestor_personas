import mysql from "mysql2/promise"

let pool: mysql.Pool | null = null

export function getDbPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number.parseInt(process.env.DB_PORT || "3306"),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "gestor_local_personas",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    })
  }
  return pool
}

export async function testConnection() {
  try {
    const pool = getDbPool()
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()
    return true
  } catch (error) {
    console.error("[v0] Error al conectar con MySQL:", error)
    return false
  }
}

export async function executeQuery<T>(query: string, params: any[] = []): Promise<T> {
  const pool = getDbPool()
  const [results] = await pool.execute(query, params)
  return results as T
}

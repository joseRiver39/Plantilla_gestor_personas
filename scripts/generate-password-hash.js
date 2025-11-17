const bcrypt = require("bcrypt")

async function generateHash() {
  const password = "admin123"
  const saltRounds = 10

  const hash = await bcrypt.hash(password, saltRounds)
  console.log("Password hash para admin123:")
  console.log(hash)
  console.log("\nCopia este hash y reemplázalo en 002-insert-admin-user.sql")
}

generateHash()

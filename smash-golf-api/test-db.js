// test-db.js
require('dotenv').config();               // loads DATABASE_URL from .env
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Fetch all users (should be empty array initially)
  const users = await prisma.user.findMany();
  console.log('Users:', users);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

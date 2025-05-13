// test-db.js
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
console.log(Object.keys(prisma));

async function main() {
  const users = await prisma.user.findMany();
  console.log('Users:', users);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });


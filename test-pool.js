
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function testPool() {
  const url = process.env.DATABASE_URL;
  console.log('Testing POOL connection:', url.replace(/:([^:@]+)@/, ':****@'));
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: url
      }
    }
  });

  try {
    await prisma.$connect();
    console.log('✅ Pool connection successful!');
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log('✅ Query successful:', result);
  } catch (error) {
    console.error('❌ Pool connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testPool();

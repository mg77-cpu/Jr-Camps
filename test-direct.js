
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function testDirect() {
  const url = process.env.DIRECT_DATABASE_URL;
  console.log('Testing DIRECT connection:', url.replace(/:([^:@]+)@/, ':****@'));
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: url
      }
    }
  });

  try {
    await prisma.$connect();
    console.log('✅ Direct connection successful!');
  } catch (error) {
    console.error('❌ Direct connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDirect();

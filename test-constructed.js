
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function testConstructedDirect() {
  const password = 'jcVbBkuBUXjqnGja';
  const projectRef = 'wnmzleivnazjqbterytr';
  const url = `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres?sslmode=require`;
  
  console.log('Testing CONSTRUCTED DIRECT connection:', url.replace(/:([^:@]+)@/, ':****@'));
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: url
      }
    }
  });

  try {
    await prisma.$connect();
    console.log('✅ Constructed Direct connection successful!');
  } catch (error) {
    console.error('❌ Constructed Direct connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConstructedDirect();

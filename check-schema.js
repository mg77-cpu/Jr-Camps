
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function checkSchema() {
  const url = process.env.DATABASE_URL;
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: url
      }
    }
  });

  try {
    const result = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Partner';
    `;
    console.log('Columns in Partner table:');
    console.table(result);
  } catch (error) {
    console.error('❌ Error checking schema:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchema();

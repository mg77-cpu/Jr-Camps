import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function getPrismaDatasourceUrl() {
  const rawUrl = process.env.DATABASE_URL;
  if (!rawUrl) return undefined;

  try {
    const url = new URL(rawUrl);
    const isPooler =
      url.searchParams.get('pgbouncer') === 'true' ||
      url.hostname.includes('pooler') ||
      url.port === '6543';

    if (isPooler) {
      url.searchParams.set('pgbouncer', 'true');
      url.searchParams.set('statement_cache_size', '0');
    }

    return url.toString();
  } catch {
    return rawUrl;
  }
}

const datasourceUrl = getPrismaDatasourceUrl();

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    ...(datasourceUrl ? { datasources: { db: { url: datasourceUrl } } } : {}),
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

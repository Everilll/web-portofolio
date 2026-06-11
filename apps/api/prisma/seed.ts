import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL! },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL!,
      password: hash,
    },
  });
  console.log('Admin seeded');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
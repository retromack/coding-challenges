import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  console.log("start seeding …");

  console.log("seeding done");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

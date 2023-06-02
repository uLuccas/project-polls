import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.polls.deleteMany();

  console.log("Seeding...");
  const date = new Date().toISOString();

  const response = await prisma.polls.create({
    data: {
      title: "Deu bom?",
      content: "Enquente mockada top",
      option1: "Sim deu bom",
      option2: "Não deu",
      votes_option1: 0,
      votes_option2: 0,
      votes_option3: 0,
      created_at: date,
      updated_at: date,
    },
  });
  console.log({ response });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

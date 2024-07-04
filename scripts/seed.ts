const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "UI/UX Design" },
        { name: "Product Management" },
        { name: "Marketing" },
        { name: "Business" },
        { name: "Finance" },
        { name: "Healthcare" },
        { name: "Education" },
        { name: "Language" },
        { name: "Music" },
        { name: "Photography" },
        { name: "Fashion" },
        { name: "Food" },
        { name: "Travel" },
        { name: "Sports" },
        { name: "Outdoors" },
        { name: "Fitness" },
      ],
    });

    console.log("Seeded the database categories");
  } catch (error) {
    console.log("Error seeding the database categories: ", error);
  } finally {
    await db.$disconnect();
  }
}

main();

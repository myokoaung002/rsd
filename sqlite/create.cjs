const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

prisma.user.create({
    data: {
        name: "Bob",
        bio: "Profile bio",
        posts: {
            create: [
                {content: "First Post"},
                {content: "Second Post"},
            ],
        },
    },
}).then(() => {
    console.log("Insertd User Bob with Posts");
}).catch(e => {
    console.error(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
});
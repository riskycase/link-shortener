const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

db.user
  .update({
    where: { email: process.env.EMAIL_ADMIN },
    data: { level: "ADMIN" },
  })
  .then((user) =>
    console.log(
      `User with email ${process.env.EMAIL_ADMIN} elevated to ${user.level}`
    )
  );

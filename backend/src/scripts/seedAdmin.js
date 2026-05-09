import { connectDatabase } from "../config/db.js";
import { User } from "../models/User.js";

const run = async () => {
  await connectDatabase();
  const email = "admin@medsecure.ai";
  const exists = await User.findOne({ email });
  if (exists) {
    console.log("Admin already exists");
    process.exit(0);
  }

  await User.create({
    fullName: "MedSecure Admin",
    email,
    password: "ChangeMeNow123!",
    role: "admin"
  });

  console.log("Admin seeded: admin@medsecure.ai / ChangeMeNow123!");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

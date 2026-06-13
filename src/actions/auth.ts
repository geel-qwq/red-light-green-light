// app/actions/auth.ts
"use server";

import bcrypt from "bcryptjs";
// Import your database client (this assumes you have Prisma set up)
import prisma from "@/lib/prisma"; 
import { redirect } from "next/navigation";

export async function registerUser(prevState: any, formData: FormData) {
  // 1. Extract data from the form
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  // 2. Basic Validation
  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  try {
    // 3. Check if the user already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User with this email already exists." };
    }

    // 4. Hash the password securely
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 5. Save the new user to the database
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });

  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong. Please try again." };
  }

  // 6. Redirect to the login page on success
  redirect("/login");
}
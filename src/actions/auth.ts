// src/actions/auth.ts
"use server";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import prisma from "@/lib/prisma"; 
import { redirect } from "next/navigation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const DOMAIN = "mail.kylbrc.xyz";

export async function registerUser(prevState: any, formData: FormData) {
  // 1. Extract Personal Information
  const firstName = formData.get("firstName") as string;
  const middleName = formData.get("middleName") as string;
  const lastName = formData.get("lastName") as string;
  const dobRaw = formData.get("dob") as string;
  const gender = formData.get("gender") as string;

  // 2. Extract Contact Information
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  // 3. Extract Location Data
  const region = formData.get("region") as string;
  const province = formData.get("province") as string;
  const city = formData.get("city") as string;
  const barangay = formData.get("barangay") as string;
  const streetAddress = formData.get("streetAddress") as string;

  // 4. Extract Account Information
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // --- VALIDATION ---
  
  // Check required fields (matching your frontend 'required' attributes)
  if (!firstName || !lastName || !email || !phone || !password || !region || !city || !barangay) {
    return { error: "Please fill in all required fields." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  // --- DATABASE OPERATIONS ---

  try {
    // Check if the email is already taken
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Format optional data
    // If the user inputs "N/A" for middle name, we store it as null in the DB to keep it clean
    const finalMiddleName = !middleName || middleName.toUpperCase() === "N/A" ? null : middleName;
    const parsedDob = dobRaw ? new Date(dobRaw) : null;

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    // Create the user in the database
    await prisma.user.create({
      data: {
        firstName,
        middleName: finalMiddleName,
        lastName,
        dob: parsedDob,
        gender: gender || null,
        
        email,
        phone,
        passwordHash: hashedPassword,
        verificationToken,
        verificationTokenExpires,
        
        region,
        // Because NCR disables the province dropdown, `province` might be empty.
        // `|| null` ensures it saves cleanly without throwing a Prisma error.
        province: province || null, 
        city,
        barangay,
        streetAddress: streetAddress || null,
      },
    });

    // Send verification email (fire-and-forget to avoid blocking registration)
    const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email/${verificationToken}`;
    resend.emails.send({
      from: `ilLUMENate <noreply@${DOMAIN}>`,
      to: email,
      subject: "Verify your ilLUMENate email",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="color: #1E3A8A;">ilLUMENate</h1>
          <p>Thanks for registering! Please verify your email address by clicking the button below.</p>
          <a href="${verifyUrl}" style="display: inline-block; background: #1E3A8A; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 16px 0;">
            Verify Email
          </a>
          <p style="color: #666; font-size: 14px;">This link expires in 24 hours. If you didn't create an account, ignore this email.</p>
        </div>
      `,
    }).catch((err) => console.error("Failed to send verification email:", err));

  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to create account. Please try again later." };
  }

  // --- SUCCESS REDIRECT ---
  redirect("/login");
}
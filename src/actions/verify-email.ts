"use server";

import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { createNotification } from "@/actions/notifications";

const resend = new Resend(process.env.RESEND_API_KEY!);
const DOMAIN = "mail.kylbrc.xyz";

export async function sendVerificationEmail() {
  const session = await getSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) throw new Error("User not found");
  if (user.emailVerified) throw new Error("Email already verified");

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

  await prisma.user.update({
    where: { id: user.id },
    data: { verificationToken: token, verificationTokenExpires: expiresAt },
  });

  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email/${token}`;

  try {
    await resend.emails.send({
      from: `ilLUMENate <noreply@${DOMAIN}>`,
      to: user.email,
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
    });
  } catch (err) {
    console.error("Failed to send verification email:", err);
    throw new Error("Failed to send verification email. Please try again later.");
  }

  revalidatePath("/");
  return { success: true };
}

export async function verifyEmailToken(token: string) {
  if (!token) return { error: "Invalid verification link." };

  const user = await prisma.user.findUnique({
    where: { verificationToken: token },
  });

  if (!user) return { error: "Invalid or expired verification link." };
  if (user.emailVerified) return { error: "Email is already verified." };
  if (!user.verificationTokenExpires || user.verificationTokenExpires < new Date()) {
    return { error: "This verification link has expired. Request a new one." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      verificationToken: null,
      verificationTokenExpires: null,
    },
  });

  await createNotification({
    userId: user.id,
    title: "Email Verified",
    message: "Your email has been verified successfully.",
    type: "EMAIL_VERIFIED",
  });

  return { success: true };
}

export async function getEmailVerificationStatus() {
  const session = await getSession();
  if (!session?.user?.id) return { verified: false, email: "" };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { emailVerified: true, email: true },
  });

  return {
    verified: !!user?.emailVerified,
    email: user?.email ?? "",
  };
}

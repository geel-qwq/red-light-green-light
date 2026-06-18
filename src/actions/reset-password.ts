"use server";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { logAudit } from "@/lib/audit";

const resend = new Resend(process.env.RESEND_API_KEY!);
const DOMAIN = "mail.kylbrc.xyz";

export async function requestReset(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { error: "Enter a valid email address." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "No account found with this email. Please register first." };
  }

  // Delete any existing tokens for this email
  await prisma.passwordResetToken.deleteMany({
    where: { email, usedAt: null, expiresAt: { gt: new Date() } },
  });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await prisma.passwordResetToken.create({
    data: { email, token, expiresAt },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

  try {
    await resend.emails.send({
      from: `ilLUMENate <noreply@${DOMAIN}>`,
      to: email,
      subject: "Reset your ilLUMENate password",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="color: #1E3A8A;">ilLUMENate</h1>
          <p>You requested a password reset. Click the button below to set a new password.</p>
          <a href="${resetUrl}" style="display: inline-block; background: #1E3A8A; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 16px 0;">
            Reset Password
          </a>
          <p style="color: #666; font-size: 14px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send reset email:", err);
    return { error: "Failed to send email. Please try again later." };
  }

  await logAudit('REQUEST_PASSWORD_RESET', 'User', user.id, JSON.stringify({ email }))

  return { success: true };
}

export async function resetPassword(prevState: any, formData: FormData) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!token) return { error: "Invalid reset link." };

  if (!password || password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return { error: "Password must contain at least one letter and one number." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken) return { error: "Invalid or expired reset link." };
  if (resetToken.usedAt) return { error: "This reset link has already been used." };
  if (resetToken.expiresAt < new Date()) return { error: "This reset link has expired." };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.$transaction([
    prisma.user.update({
      where: { email: resetToken.email },
      data: { passwordHash: hashedPassword },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    }),
  ]);

  await logAudit('RESET_PASSWORD', 'User', resetToken.email, JSON.stringify({ email: resetToken.email }))

  return { success: true };
}

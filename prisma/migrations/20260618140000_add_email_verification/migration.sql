-- AlterTable: Add email verification columns to User
ALTER TABLE "User" ADD COLUMN "emailVerified" TIMESTAMPTZ;
ALTER TABLE "User" ADD COLUMN "verificationToken" TEXT;
ALTER TABLE "User" ADD COLUMN "verificationTokenExpires" TIMESTAMPTZ;

-- CreateIndex
CREATE UNIQUE INDEX "User_verificationToken_key" ON "User"("verificationToken");

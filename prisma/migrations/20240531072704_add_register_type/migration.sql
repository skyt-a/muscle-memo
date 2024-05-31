/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RegisterType" AS ENUM ('Original', 'Preset');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "registerType" "RegisterType";

-- AlterTable
ALTER TABLE "Parts" ADD COLUMN     "registerType" "RegisterType" NOT NULL DEFAULT 'Preset';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";

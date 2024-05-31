-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Parts" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Parts" ADD CONSTRAINT "Parts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

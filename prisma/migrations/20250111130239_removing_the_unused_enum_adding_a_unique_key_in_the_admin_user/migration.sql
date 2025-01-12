/*
  Warnings:

  - The values [FINESHED] on the enum `State` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[user]` on the table `admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "State_new" AS ENUM ('COMPLETED', 'LOAN');
ALTER TABLE "loans" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "loans" ALTER COLUMN "state" TYPE "State_new" USING ("state"::text::"State_new");
ALTER TYPE "State" RENAME TO "State_old";
ALTER TYPE "State_new" RENAME TO "State";
DROP TYPE "State_old";
ALTER TABLE "loans" ALTER COLUMN "state" SET DEFAULT 'LOAN';
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "admin_user_key" ON "admin"("user");

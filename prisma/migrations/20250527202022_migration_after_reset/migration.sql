/*
  Warnings:

  - You are about to drop the column `ClientID` on the `servicos` table. All the data in the column will be lost.
  - You are about to drop the column `ClientSecret` on the `servicos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clientID]` on the table `servicos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientID` to the `servicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientSecret` to the `servicos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servicos" DROP COLUMN "ClientID",
DROP COLUMN "ClientSecret",
ADD COLUMN     "clientID" TEXT NOT NULL,
ADD COLUMN     "clientSecret" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "servicos_clientID_key" ON "servicos"("clientID");

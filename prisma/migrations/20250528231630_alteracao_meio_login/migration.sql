/*
  Warnings:

  - You are about to drop the column `senha` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `servicos` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "senha";

-- DropTable
DROP TABLE "servicos";

-- CreateTable
CREATE TABLE "credenciais" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "credenciais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credenciais_login_key" ON "credenciais"("login");

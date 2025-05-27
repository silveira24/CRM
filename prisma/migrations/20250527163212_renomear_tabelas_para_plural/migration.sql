/*
  Warnings:

  - You are about to drop the `Servico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tarefa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_responsavelId_fkey";

-- DropTable
DROP TABLE "Servico";

-- DropTable
DROP TABLE "Tarefa";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "tarefas" (
    "id" SERIAL NOT NULL,
    "projeto" VARCHAR(100),
    "titulo" VARCHAR(100),
    "descricao" VARCHAR(300),
    "criado_por" VARCHAR(50),
    "criado_em" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "status" "status_tarefa" DEFAULT 'não iniciado',
    "prioridade" "prioridade_tarefa" DEFAULT 'média',
    "prazo" DATE,
    "responsavelId" INTEGER,
    "comentarios" VARCHAR(500),

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "telefone" VARCHAR(20),
    "email" VARCHAR(100) NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicos" (
    "id" SERIAL NOT NULL,
    "ClientID" TEXT NOT NULL,
    "ClientSecret" TEXT NOT NULL,

    CONSTRAINT "servicos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

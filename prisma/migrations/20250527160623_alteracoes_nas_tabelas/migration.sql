/*
  Warnings:

  - You are about to drop the `tarefas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_responsavel_fkey";

-- DropTable
DROP TABLE "tarefas";

-- DropTable
DROP TABLE "usuarios";

-- CreateTable
CREATE TABLE "Tarefa" (
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

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "telefone" VARCHAR(20),
    "email" VARCHAR(100) NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" SERIAL NOT NULL,
    "ClientID" TEXT NOT NULL,
    "ClientSecret" TEXT NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

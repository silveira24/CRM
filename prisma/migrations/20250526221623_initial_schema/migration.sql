-- CreateEnum
CREATE TYPE "prioridade_tarefa" AS ENUM ('baixa', 'média', 'alta');

-- CreateEnum
CREATE TYPE "status_tarefa" AS ENUM ('não iniciado', 'aceito', 'em andamento', 'finalizado', 'atrasado');

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
    "responsavel" INTEGER,
    "comentarios" VARCHAR(500),

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "telefone" VARCHAR(20),
    "email" VARCHAR(100),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_responsavel_fkey" FOREIGN KEY ("responsavel") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

/*
  Warnings:

  - The values [média] on the enum `prioridade_tarefa` will be removed. If these variants are still used in the database, this will fail.
  - The values [não iniciado,em andamento] on the enum `status_tarefa` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "prioridade_tarefa_new" AS ENUM ('baixa', 'media', 'alta');
ALTER TABLE "tarefas" ALTER COLUMN "prioridade" DROP DEFAULT;
ALTER TABLE "tarefas" ALTER COLUMN "prioridade" TYPE "prioridade_tarefa_new" USING ("prioridade"::text::"prioridade_tarefa_new");
ALTER TYPE "prioridade_tarefa" RENAME TO "prioridade_tarefa_old";
ALTER TYPE "prioridade_tarefa_new" RENAME TO "prioridade_tarefa";
DROP TYPE "prioridade_tarefa_old";
ALTER TABLE "tarefas" ALTER COLUMN "prioridade" SET DEFAULT 'media';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "status_tarefa_new" AS ENUM ('nao_iniciado', 'aceito', 'em_andamento', 'finalizado', 'atrasado');
ALTER TABLE "tarefas" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tarefas" ALTER COLUMN "status" TYPE "status_tarefa_new" USING ("status"::text::"status_tarefa_new");
ALTER TYPE "status_tarefa" RENAME TO "status_tarefa_old";
ALTER TYPE "status_tarefa_new" RENAME TO "status_tarefa";
DROP TYPE "status_tarefa_old";
ALTER TABLE "tarefas" ALTER COLUMN "status" SET DEFAULT 'nao_iniciado';
COMMIT;

-- AlterTable
ALTER TABLE "tarefas" ALTER COLUMN "status" SET DEFAULT 'nao_iniciado',
ALTER COLUMN "prioridade" SET DEFAULT 'media';

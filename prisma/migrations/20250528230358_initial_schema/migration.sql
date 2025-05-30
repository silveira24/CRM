/*
  Warnings:

  - The values [baixa,media,alta] on the enum `prioridade_tarefa` will be removed. If these variants are still used in the database, this will fail.
  - The values [nao_iniciado,aceito,em_andamento,finalizado,atrasado] on the enum `status_tarefa` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "prioridade_tarefa_new" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');
ALTER TABLE "tarefas" ALTER COLUMN "prioridade" DROP DEFAULT;
ALTER TABLE "tarefas" ALTER COLUMN "prioridade" TYPE "prioridade_tarefa_new" USING ("prioridade"::text::"prioridade_tarefa_new");
ALTER TYPE "prioridade_tarefa" RENAME TO "prioridade_tarefa_old";
ALTER TYPE "prioridade_tarefa_new" RENAME TO "prioridade_tarefa";
DROP TYPE "prioridade_tarefa_old";
ALTER TABLE "tarefas" ALTER COLUMN "prioridade" SET DEFAULT 'MEDIA';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "status_tarefa_new" AS ENUM ('NAO_INICIADO', 'ACEITO', 'EM_ANDAMENTO', 'FINALIZADO', 'ATRASADO');
ALTER TABLE "tarefas" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tarefas" ALTER COLUMN "status" TYPE "status_tarefa_new" USING ("status"::text::"status_tarefa_new");
ALTER TYPE "status_tarefa" RENAME TO "status_tarefa_old";
ALTER TYPE "status_tarefa_new" RENAME TO "status_tarefa";
DROP TYPE "status_tarefa_old";
ALTER TABLE "tarefas" ALTER COLUMN "status" SET DEFAULT 'NAO_INICIADO';
COMMIT;

-- AlterTable
ALTER TABLE "tarefas" ALTER COLUMN "status" SET DEFAULT 'NAO_INICIADO',
ALTER COLUMN "prioridade" SET DEFAULT 'MEDIA';

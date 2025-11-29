/*
  Warnings:

  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `complementAddress` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cart_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deliveryMans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_status_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_methods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `atualizadoEm` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senhaHash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PACIENTE', 'PROFISSIONAL', 'ADMIN');

-- CreateEnum
CREATE TYPE "ConsultaStatus" AS ENUM ('AGENDADA', 'CONCLUIDA', 'CANCELADA', 'FALTA');

-- CreateEnum
CREATE TYPE "Prioridade" AS ENUM ('P1', 'P2', 'P3', 'P4', 'P5');

-- CreateEnum
CREATE TYPE "WhatsStatus" AS ENUM ('ATIVO', 'INATIVO', 'PENDENTE');

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cartId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "order_status_history" DROP CONSTRAINT "order_status_history_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_status_history" DROP CONSTRAINT "order_status_history_statusId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_deliveryManId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_statusId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropIndex
DROP INDEX "users_phone_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "address",
DROP COLUMN "complementAddress",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "phone",
ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'PACIENTE',
ADD COLUMN     "senhaHash" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT,
ADD COLUMN     "whatsStatus" "WhatsStatus" NOT NULL DEFAULT 'PENDENTE',
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "cart_items";

-- DropTable
DROP TABLE "carts";

-- DropTable
DROP TABLE "deliveryMans";

-- DropTable
DROP TABLE "order_items";

-- DropTable
DROP TABLE "order_status";

-- DropTable
DROP TABLE "order_status_history";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "payment_methods";

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "organizacoes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "endereco" TEXT,

    CONSTRAINT "organizacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profissionais" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "organizacaoId" INTEGER NOT NULL,
    "especialidade" TEXT NOT NULL,
    "registro" TEXT,

    CONSTRAINT "profissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultas" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    "organizacaoId" INTEGER NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "prioridade" "Prioridade" NOT NULL,
    "status" "ConsultaStatus" NOT NULL DEFAULT 'AGENDADA',
    "compareceu" BOOLEAN,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda_profissional" (
    "id" SERIAL NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3) NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "agenda_profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_stats" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    "presencas" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "attendance_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_admins" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "acao" TEXT NOT NULL,
    "detalhes" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_userId_key" ON "pacientes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profissionais_userId_key" ON "profissionais"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_stats_pacienteId_key" ON "attendance_stats"("pacienteId");

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profissionais" ADD CONSTRAINT "profissionais_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profissionais" ADD CONSTRAINT "profissionais_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "organizacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "organizacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda_profissional" ADD CONSTRAINT "agenda_profissional_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_stats" ADD CONSTRAINT "attendance_stats_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_admins" ADD CONSTRAINT "log_admins_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

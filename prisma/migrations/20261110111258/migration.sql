/*
  Warnings:

  - Made the column `prize` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `prize` DECIMAL(65, 30) NOT NULL DEFAULT 0;

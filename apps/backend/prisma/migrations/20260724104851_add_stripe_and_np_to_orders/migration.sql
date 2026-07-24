/*
  Warnings:

  - You are about to drop the column `delivery_city` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_city_ref` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_warehouse` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `warehouse_ref` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "delivery_city",
DROP COLUMN "delivery_city_ref",
DROP COLUMN "delivery_warehouse",
DROP COLUMN "warehouse_ref",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "np_branch" TEXT,
ADD COLUMN     "np_city" TEXT;

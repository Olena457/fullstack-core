/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sku` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "color" TEXT,
ADD COLUMN     "size" TEXT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "delivery_city" TEXT,
ADD COLUMN     "delivery_city_ref" TEXT,
ADD COLUMN     "delivery_warehouse" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "stripe_session_id" TEXT,
ADD COLUMN     "ttn" TEXT,
ADD COLUMN     "warehouse_ref" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "old_price" DOUBLE PRECISION,
ADD COLUMN     "sku" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

/*
  Warnings:

  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Image` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `RentEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `RentEvent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `itemID` on the `Image` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `itemID` on the `RentEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_itemID_fkey";

-- DropForeignKey
ALTER TABLE "RentEvent" DROP CONSTRAINT "RentEvent_itemID_fkey";

-- AlterTable
ALTER TABLE "Image" DROP CONSTRAINT "Image_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "itemID",
ADD COLUMN     "itemID" INTEGER NOT NULL,
ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RentEvent" DROP CONSTRAINT "RentEvent_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "itemID",
ADD COLUMN     "itemID" INTEGER NOT NULL,
ADD CONSTRAINT "RentEvent_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_itemID_key" ON "Image"("itemID");

-- CreateIndex
CREATE UNIQUE INDEX "RentEvent_itemID_key" ON "RentEvent"("itemID");

-- AddForeignKey
ALTER TABLE "RentEvent" ADD CONSTRAINT "RentEvent_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
